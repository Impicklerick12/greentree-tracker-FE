import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

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
        <div>
            <Card className={classes.root} >
                <CardActionArea>
                    <Link to={`plants/${plant._id}`}>
                        <CardMedia
                        className={classes.media}
                        image="/public/images/stock-plant.jpg"
                        title="Stock Image"
                        alt="Photo by Syded Mohammad Ismail"
                        />
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
                </CardActionArea>
            </Card>
        </div>
    )
}

export default withRouter(PlantsEach)
