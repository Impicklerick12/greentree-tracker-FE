import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import StockPlant from '../images/stock-plant.jpg'
import { deletePlant, addPlantToCart } from '../services/plantServices'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
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
    maxWidth: 345,
  },
  media: {
    width: "100%",
  },
  form: {
    margin: theme.spacing(2),
    width: '100%',
  },
  quantity_field: {
      width: '10%'
  }
}))

const PlantsShow = ({history, plant}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { plants, loggedInUser, quotePlants } = store

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
        special, 
        quantity 
    } = plant

    function handleEdit(event) {
        event.preventDefault()
        history.push(`/plants/edit/${plant._id}`)
    }

    function handleDelete(event) {
        // event.preventDefault()

        // const updatedPlants = plants.filter((p) => p._id !== plant._id)
        // dispatch({
        //     type: "setPlants",
        //     data: updatedPlants
        // })

        // history.push("/plants")

        // TO USE IN PRODUCTION - REPLACE CODE ABOVE
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
        
        addPlantToCart(newPlantToCart).then((newPlant) => {
            dispatch({
                type: "setQuotePlants",
                data: [...quotePlants, newPlant]
            })
            console.log(newPlant)
            history.push('/quote')
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
            console.log("caught error on Add to cart", error)
            if(status === 403)
                setErrorMessage("You are not an admin, and unable to create a plant")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <Card className={classes.root}>
                        {/* <CardMedia
                        className={classes.media}
                        image="/src/images/stock-plant.jpg"
                        title="Contemplative Reptile"
                        /> */}
                <img className={classes.media} src={StockPlant} alt="Photo by Syded Mohammad Ismail"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {common_name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {botanical_name}
                    </Typography>
                    {modified_date ? (
                        <Typography variant="body2" color="textSecondary" component="p">
                            Last Updated: {modified_date.toLocaleString()}
                        </Typography>
                    ) : (
                        <div></div>
                    )}
                    <Typography variant="body2" color="textSecondary" component="p">
                        Category: {category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Pot Size: {pot_size}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price: ${price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Quantity Available: {quantity}
                    </Typography>
                </CardContent>
                {loggedInUser && (
                    <>
                        <form className={classes.form} onSubmit={handleAddToCart}>
                            <TextField 
                                className={classes.quantity_field} 
                                size="small" 
                                id="standard-basic" 
                                label="Quantity" 
                                type="number" 
                                name="quantity"
                                onChange={handleQuantityChange} 
                            />
                            <p>x</p>
                            <p>{common_name} - {pot_size} - ${price}</p>
                            <input type="submit" value="Add to quote request"></input>
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
