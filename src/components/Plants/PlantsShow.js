import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../../config/store'
import StockPlant from '../../images/stock-plant.jpg'
import { deletePlant } from '../../services/plantServices'
import { addPlantToCart } from '../../services/cartServices'
import { alertBanner, infoBanner } from '../Alerts'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    Button,
    Typography,
    IconButton,
    TextField,
    Grid
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  plant: {
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    minHeight: '500px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
        padding: theme.spacing(1),
    }
  },
  titles: {
    flexDirection: 'column'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        height: '60vh',
        padding: theme.spacing(1),
    }
  },
  options: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '1rem 0'
    }
  }
}))

const PlantsShow = ({history, plant, capitalize}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { plants, loggedInUser, admin } = store

    const initialQuoteFormState = {
        quantity: 1,
        plant: ""
    }

    const [quoteFormState, setQuoteFormState] = useState(initialQuoteFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    const [cartErrorMessage, setCartErrorMessage] = useState(null)

    // If we don't have a plant, return null
    if (!plant) return null

    const { 
        common_name, 
        botanical_name, 
        category, 
        modified_date, 
        description, 
        price, 
        pot_size,
        plant_image
    } = plant

    function handleEdit(event) {
        event.preventDefault()
        history.push(`/plants/edit/${plant._id}`)
    }

    function handleDelete(event) {
        event.preventDefault()

        deletePlant(plant._id)
            .then(() => {
                const updatedPlants = plants.filter((p) => p._id !== plant._id)
                dispatch({
                    type: "setPlants",
                    data: updatedPlants
                })
                history.push("/plants")
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                if(status === 403) {
                    setErrorMessage("You are not an admin, and unable to delete a plant")
                } else {
                    setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
                }
            })
    }

    function handleBack(event) {
        event.preventDefault()
        history.goBack()
    }

    function handleQuantityChange(event) {
        let name = event.target.name
        let value = event.target.value

        if (value < 1) {
            value = 1
        } else {
            setQuoteFormState({
                ...quoteFormState,
                [name]: value
            })
        }
    }

    function handleAddToCart(event) {
        event.preventDefault()
        const newPlantToCart = {
            quantity: quoteFormState.quantity,
            plant: plant._id
        }
        
        addPlantToCart(newPlantToCart).then((cartData) => {
            dispatch({
                type: "setQuotePlants",
                data: cartData
            })
            history.push('/quote')
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on Add to cart", error)
            if(status === 403) {
                setCartErrorMessage("There was an error adding the plant to your cart")
            } else {
                setCartErrorMessage("Well, this is embarrassing... There was a problem on the server.")
            }
        })
    }

    return (
        <div>
            {errorMessage && alertBanner(errorMessage)}
            {cartErrorMessage && alertBanner(cartErrorMessage)}
            <Card className={classes.root}>
                <Grid container className={classes.plant}>
                    <Grid item sm={12} md={6} className={classes.details}>
                        <Grid container spacing={1} className={classes.titles}>
                            <Typography variant="subtitle1" color="textSecondary">
                                {botanical_name}
                            </Typography>
                            <Typography variant="h4" color="primary">
                                {common_name}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" component="p">
                                <strong>${price}</strong>
                            </Typography>
                        </Grid>
                        {modified_date ? (
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Last Updated:</strong> {modified_date.toLocaleString()}
                            </Typography>
                        ) : (
                            <div></div>
                        )}
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                        <Grid container className={classes.options}>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Category:</strong> {capitalize(category)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Pot Size:</strong> {pot_size}
                                </Typography>
                            </Grid>
                            {/* NEED TO CHANGE TO ONLY ADMIN ROLE */}
                            { admin && (
                                <Grid item>
                                    <CardActions>
                                        <IconButton id="edit" color="primary" onClick={handleEdit}>
                                            <EditIcon fontSize="large"/>
                                        </IconButton>
                                        <IconButton id="delete" color="secondary" onClick={handleDelete}>
                                            <DeleteIcon fontSize="large"/>
                                        </IconButton>
                                    </CardActions>
                                </Grid>
                            )}
                        </Grid>
                        { loggedInUser ? (
                            <form onSubmit={handleAddToCart}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <TextField
                                            size="small" 
                                            variant="outlined"
                                            label="Quantity" 
                                            type="number" 
                                            name="quantity"
                                            value={quoteFormState.quantity}
                                            onChange={handleQuantityChange} 
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button 
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            size="large"
                                        >
                                            Add to quote request
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        ) : (
                            infoBanner("You need to log in to add plants to your cart")
                        )}
                    </Grid>
                    <Grid item sm={12}  md={6}>
                        <img className={classes.media} src={plant_image ? plant_image : StockPlant} alt={common_name}/>
                    </Grid>
                </Grid>
            </Card>
            <Button variant="outlined" color="primary" onClick={handleBack}>Back</Button>
        </div>
    )
}

export default withRouter(PlantsShow)
