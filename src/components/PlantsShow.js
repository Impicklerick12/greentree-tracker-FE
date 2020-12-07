import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useGlobalState } from '../config/store'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    IconButton
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const PlantsShow = ({history, plant}) => {

    const classes = useStyles();

    const { store, dispatch } = useGlobalState()
    const { plants, loggedInUser } = store

    function handleEdit(event) {
        event.preventDefault()

        history.push(`/plants/edit/${plant._id}`)
    }

    function handleDelete(event) {
        event.preventDefault()

        const updatedPlants = plants.filter((p) => p._id !== plant._id)
        dispatch({
            type: "setPlants",
            data: updatedPlants
        })

        history.push("/plants")
    }

    function handleBack(event) {
        event.preventDefault()
        history.goBack()
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
            <Card className={classes.root}>
                <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image="/public/images/stock-plant.jpg"
                        title="Contemplative Reptile"
                        />
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
                </CardActionArea>
                {loggedInUser && (
                    <CardActions>
                        <Button size="small" color="primary" onClick={handleEdit}>
                        Edit
                        </Button>
                        <IconButton aria-label="delete" color="secondary" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                )}
            </Card>
            <Button onClick={handleBack}>Back</Button>
        </div>
    )
}

export default withRouter(PlantsShow)
