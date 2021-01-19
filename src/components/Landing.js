import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../images/artem-kniaz-03Dhzux8mCI-unsplash.jpg";
import image2 from "../images/george-bakos-SEFaaIjrjZA-unsplash.jpg";
import image3 from "../images/stock-plant.jpg";

import { 
    makeStyles, 
    createMuiTheme,
    ThemeProvider,
    responsiveFontSizes,
} from '@material-ui/core/styles';
import { 
    Grid,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    color: {
        color: "black"
    },
    text: {

    }
}));

let theme = createMuiTheme({
    typography: {
        h3: {
            fontFamily: "verdana"
        },
    }
});
theme = responsiveFontSizes(theme)

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
                    <ThemeProvider theme={theme}>
                        <Typography className={classes.text} variant="h3" align="center" display="block">
                            Who are we?
                        </Typography>
                        <Typography className={classes.text} variant="h6" align="center" display="block">
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                            </ul>
                        </Typography>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={6}>
                    <img src={image3} width="90%" height="90%" alt="plant image"/>
                </Grid>
                <Grid item xs={6}>
                    <img src={image3} width="90%" height="90%" alt="plant image"/>
                </Grid>
                <Grid item xs={6}>
                    <ThemeProvider theme={theme}>
                        <Typography className={classes.text} variant="h3" align="center" display="block">
                            <p>What we offer?</p>
                        </Typography> 
                    <Typography className={classes.text} variant="h6" align="center" display="block">
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
                        </ul>
                    </Typography>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12} className={classes.color}>
                    <ThemeProvider theme={theme}>
                        <Typography className={classes.text} variant="h3" align="center" display="block">
                            Where to find us
                        </Typography>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12} align="center">
                    <ThemeProvider theme={theme}>
                        <Typography className={classes.text} variant="h6" align="center" display="block">
                            14 Adelaide Street, Brisbane City QLD 4000
                        </Typography>
                    </ThemeProvider>
                </Grid>
                <Grid container justify="center" item xs={12}>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.978764016295!2d153.02095171505695!3d-27.469920482890775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a0467886afb%3A0x7e7af927778ca136!2s14%20Adelaide%20St%2C%20Brisbane%20City%20QLD%204000!5e0!3m2!1sen!2sau!4v1610415566345!5m2!1sen!2sau" 
                        width="600" 
                        height="450" 
                        frameBorder="0" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        aria-hidden="false" 
                        tabIndex="0">
                    </iframe>
                </Grid>
            </Grid>
            <br />
            <br />
        </div>
    )
}

export default Landing
