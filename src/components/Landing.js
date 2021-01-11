import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../images/artem-kniaz-03Dhzux8mCI-unsplash.jpg";
import image2 from "../images/george-bakos-SEFaaIjrjZA-unsplash.jpg";
import image3 from "../images/stock-plant.jpg";

import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid,
    Typography 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    text: {

    }
}));

const Landing = () => {

    const classes = useStyles();

    return (
        <div >
            <AliceCarousel 
                autoPlay 
                autoPlayInterval="3000"
                disableButtonsControls="true">
                <img src={image1} width="100%" height="100%" alt="plant image 1"/>
                <img src={image2} width="100%" height="100%" alt="plant image 2"/>
            </AliceCarousel>
            <br />
            <br />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography classes={classes.text} variant="h6" align="center" display="block">
                        <p>Who are we?</p>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                        </ul>
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <img src={image3} width="90%" height="90%" alt="plant image"/>
                </Grid>
                <Grid item xs={6}>
                    <img src={image3} width="90%" height="90%" alt="plant image"/>
                </Grid>
                <Grid item xs={6}>
                    <Typography classes={classes.text} variant="h6" align="center" display="block">
                        <p>What we offer?</p>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                        </ul>
                    </Typography> 
                </Grid>
            </Grid>
        </div>
    )
}

export default Landing
