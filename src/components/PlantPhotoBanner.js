import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PlantImage from '../images/plant-banner-2.jpg'

const useStyles = makeStyles({
    image: {
        width: "100%"
    }
  });

const PlantPhotoBanner = ({component}) => {

    const classes = useStyles();

    return (
        <div>
            <img className={classes.image} src={PlantImage} alt="Plant Banner"/>
        </div>
    )
}

export default PlantPhotoBanner
