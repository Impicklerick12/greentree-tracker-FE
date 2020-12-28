import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import StockPlant from '../images/stock-plant.jpg'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Grid
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  media: {
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardRoot: {
      minWidth: 200
  }
}));

const PlantsEach = ({history, plant}) => {

    const classes = useStyles();

    // If we don't have a plant, return null
    if (!plant) return null

    const { 
        common_name, 
        botanical_name, 
        price
    } = plant

    return (
        <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card className={classes.cardRoot}>
                <Link to={`plants/${plant._id}`}>
                    {/* <CardMedia
                    className={classes.media}
                    src="/public/images/stock-plant.jpg"
                    title="Stock Image"
                    alt="Photo by Syded Mohammad Ismail"
                    /> */}
                    <img className={classes.media} src={StockPlant} alt="Photo by Syded Mohammad Ismail"/>
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {common_name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {botanical_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price: ${price}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default withRouter(PlantsEach)
