import React from 'react'
import { 
    Grid,
    BottomNavigation,
    Typography,
    Link,
    IconButton
} from '@material-ui/core'

import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';

import { makeStyles } from '@material-ui/core/styles';

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
        height: 200
    }
  }));

const Footer = () => {

    const classes = useStyles();

    return (
        <div>
            <hr />
            <BottomNavigation className={classes.root}>
                <Grid container spacing={2} style={{ backgroundColor: 'transparent', boxShadow: 'none', color: 'black'}}>
                    <Grid item xs={4}>
                        <Typography variant="body2" align="center" display="block">
                            <p><b>Disclaimer</b></p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">
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
                    <Grid item xs={4} align="center">
                            <Typography variant="body2" display="block">
                                <p><b>Pages</b></p>
                            </Typography>
                            <Link variant="body2" onClick={() => {console.log('home clicked')}}>
                                Home
                            </Link>
                        
                        <p>
                            <Link variant="body2" onClick={() => {console.log('plants clicked')}}>
                                Plants
                            </Link>
                        </p>
                        <p>
                            <Link variant="body2" onClick={() => {console.log('contact us clicked')}}>
                                Contact Us
                            </Link>
                        </p>
                        <p>
                            <Link variant="body2" onClick={() => {console.log('account clicked')}}>
                                Login to Account
                            </Link>
                        </p>
                    </Grid>
                </Grid>
            </BottomNavigation>
        </div>
    )
}

export default Footer
