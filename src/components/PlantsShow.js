import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import StockPlant from '../images/stock-plant.jpg'
import { deletePlant } from '../services/plantServices'
import { addPlantToCart } from '../services/cartServices'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    IconButton,
    TextField
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  plant: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        display: 'grid',
        padding: theme.spacing(1),
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '50vh',
        padding: theme.spacing(1),
    }
  },
  options: {
    width: '100%',
    display: 'flex'
    
  },
  media: {
    width: "50%",
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
  },
  form: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
  },
  quantity_field: {
      width: '90px'
  }
}))

const PlantsShow = ({history, plant}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { plants, loggedInUser } = store

    const initialQuoteFormState = {
        quantity: "",
        plant: ""
    }

    const [quoteFormState, setQuoteFormState] = useState(initialQuoteFormState)
    const [errorMessage, setErrorMessage] = useState(null)

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
        quantity,
        plant_image
    } = plant

    function handleEdit(event) {
        event.preventDefault()
        history.push(`/plants/edit/${plant._id}`)
    }

    function handleDelete(event) {
        event.preventDefault()

        deletePlant(plant._id).then(() => {
            console.log("deleted plant")
            const updatedPlants = plants.filter((p) => p._id !== plant._id)
            dispatch({
                type: "setPlants",
                data: updatedPlants
            })
            history.push("/plants")
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on delete", error)
            if(status === 403)
                setErrorMessage("You are not an admin, and unable to delete a plant")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }

    function handleBack(event) {
        event.preventDefault()
        history.goBack()
    }

    function handleQuantityChange(event) {
        const name = event.target.name
        const value = event.target.value

        setQuoteFormState({
            ...quoteFormState,
            [name]: value
        })
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
            if(status === 403)
                setErrorMessage("There was an error adding the plant to your cart")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <Card className={classes.root}>
                <div className={classes.plant}>
                    <CardContent className={classes.details}>
                        <div>
                            <Typography variant="subtitle1" color="textSecondary">
                                {botanical_name}
                            </Typography>
                            <Typography variant="h4">
                                {common_name}
                            </Typography>
                        </div>
                        {modified_date ? (
                            <Typography variant="body2" color="textSecondary" component="p">
                                Last Updated: {modified_date.toLocaleString()}
                            </Typography>
                        ) : (
                            <div></div>
                        )}
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                        <div className={classes.options}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Category: {category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Pot Size: {pot_size}
                            </Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Price: ${price}
                        </Typography>
                    </CardContent>
                    <img className={classes.media} src={plant_image ? plant_image : StockPlant} alt={common_name}/>
                </div>
                {loggedInUser && (
                    <>
                        <form className={classes.form} onSubmit={handleAddToCart}>
                            <TextField 
                                className={classes.quantity_field} 
                                size="small" 
                                variant="outlined"
                                label="Quantity" 
                                type="number" 
                                name="quantity"
                                onChange={handleQuantityChange} 
                            />
                            <Typography variant="body2">x</Typography>
                            <Typography variant="body2">{common_name} - {pot_size} - ${price}</Typography>
                            <Button 
                                type="submit"
                                variant="outlined"
                                color="primary"
                            >
                                Add to quote request
                            </Button>
                        </form>
                        <CardActions>
                            <Button size="small" color="primary" onClick={handleEdit}>
                            Edit
                            </Button>
                            <IconButton aria-label="delete" color="secondary" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </>
                )}
            </Card>
            <Button onClick={handleBack}>Back</Button>
        </div>
    )
}

export default withRouter(PlantsShow)
