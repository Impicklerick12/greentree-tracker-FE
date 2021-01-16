import React from 'react'
import { 
    Grid,
    BottomNavigation,
    Typography,
    IconButton,
    Button,
    Link
} from '@material-ui/core'
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import { makeStyles } from '@material-ui/core/styles';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        bottom: 0,
        bgColor: 'black'
    },
    footer: {
        position: 'fixed',
        width: '100%',
        bottom: 0,
        height: 200,
    }
}));

const Footer = () => {

    const classes = useStyles()

    return (
        <div>
            <BottomNavigation className={classes.root} style={{ backgroundColor: 'black' }} >
                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ backgroundColor: 'black', boxShadow: 'none', color: 'white'}}>
                        <Typography variant="body2" align="center" display="block">
                            <p><b>Disclaimer</b></p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center" style={{ backgroundColor: 'black', boxShadow: 'none', color: 'white'}}>
                        <Typography variant="body2" align="center" display="block">
                            <p><b>Contact</b></p>
                        </Typography>
                        <p>
                            <IconButton variant="body2" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <PhoneRoundedIcon fontSize="small" />
                                <Typography variant="body2" align="center" display="block">
                                    (07) 3800 1983
                                </Typography>
                            </IconButton>
                        </p>
                        <p>
                            <IconButton variant="body2" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <EmailRoundedIcon fontSize="small" />
                                <Typography variant="body2" align="center" display="block">
                                    nursery@nurserywholesale.com.au
                                </Typography>
                            </IconButton>   
                        </p>
                        <p>
                            <IconButton variant="body2" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <BusinessRoundedIcon fontSize="small" />
                                <Typography variant="body2" align="center" display="block">
                                    14 Adelaide Street, Brisbane QLD 4000
                                </Typography>
                            </IconButton>
                        </p>
                    </Grid>
                    <Grid item xs={4} align="center" style={{ backgroundColor: 'black', boxShadow: 'none', color: 'white'}}>
                            <Typography variant="body2" display="block">
                                Pages
                            </Typography>
                            <a href="/">Home</a>
                            <a href="/plants">Plants</a>
                            <a href="/contact">Contact Us</a>
                            <a href="/auth/login">Login to Account</a>
                    </Grid>
                </Grid>
            </BottomNavigation>
        </div>
    )
}

export default Footer;
