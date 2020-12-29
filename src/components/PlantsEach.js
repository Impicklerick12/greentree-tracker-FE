import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import StockPlant from '../images/stock-plant.jpg'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CardActionArea
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
    },
    media: {
        width: "100%"
    },
    cardRoot: {
        borderRadius: "30px",
        minWidth: 200,
        minHeight: 300,
        backgroundImage: `url(${StockPlant})`, // or plant_image from DB
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: "grayscale(20%)",
        boxShadow: "inset 0 -130px 140px #121212",

        "&:hover": {
            filter: "none",
            boxShadow: "none"
        }
    },
    cardContent: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        width: '100%'
    },
    subtitle: {
        color: '#e0e0e0',
        fontWeight: 100,
        opacity: "70%"
    },
    title: {
        color: '#e0e0e0',
        fontWeight: 500,
    },
    price: {
        color: '#e0e0e0',
        fontWeight: 80,
        opacity: "70%"
    }
}));

const PlantsEach = ({history, plant}) => {

    const classes = useStyles();

    // If we don't have a plant, return null
    if (!plant) return null

    const { 
        common_name, 
        botanical_name
    } = plant

    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Link to={`plants/${plant._id}`} component={CardActionArea}>
                <Card className={classes.cardRoot}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body1" className={classes.subtitle}>
                            {botanical_name}
                        </Typography>
                        <Typography variant="h5" className={classes.title}>
                            {common_name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}

export default withRouter(PlantsEach)
