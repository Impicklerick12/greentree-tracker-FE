import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import StockPlant from '../images/stock-plant.jpg'
import { deletePlant } from '../services/plantServices'

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
    const { plants, loggedInUser, quotes } = store

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
                setErrorMessage("Oops! It appears we lost your login session. Make sure 3rd party cookies are not blocked by your browser settings.")
            else
                setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
        })
    }

    function handleBack(event) {
        event.preventDefault()
        history.goBack()
    }

    const initialQuoteFormState = {
        quantity: "",
        item: "",
        user: ""
    }

    const [quoteFormState, setQuoteFormState] = useState(initialQuoteFormState)
    const [errorMessage, setErrorMessage] = useState(null)

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        setQuoteFormState({
            ...quoteFormState,
            [name]: value
        })
    }

    function handleQuoteSubmit(event) {
        event.preventDefault()
        const newQuote = {
            quantity: quoteFormState.quantity,
            item: `${common_name} - ${pot_size} - $${price}`,
            user: loggedInUser.email
        }
        
        dispatch({
            type: "setQuotes",
            data: [...quotes, newQuote]
        })

        history.push('/quote')
    }

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
                    <Typography variant="body2" color="textSecondary" component="p">
                        Date Added: {modified_date.toLocaleString()}
                    </Typography>
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
                        <form className={classes.form} onSubmit={handleQuoteSubmit}>
                            <TextField 
                                className={classes.quantity_field} 
                                size="small" 
                                id="standard-basic" 
                                label="Quantity" 
                                type="number" 
                                name="quantity"
                                onChange={handleChange} 
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
