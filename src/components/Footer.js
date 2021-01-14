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
        height: '200px'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
    },
    pages: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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
                            Disclaimer
                        </Typography>
                        <Typography variant="body2" align="center" display="block">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center" className={classes.info}>
                        <Typography variant="body2" align="center" display="block">
                            Contact
                        </Typography>
                        <IconButton variant="body2" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <PhoneRoundedIcon fontSize="small" />
                            <Typography variant="body2" align="center" display="block">
                                (07) 3800 1983
                            </Typography>
                        </IconButton>
                        <IconButton variant="body2" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <EmailRoundedIcon fontSize="small" />
                            <Typography variant="body2" align="center" display="block">
                                nursery@nurserywholesale.com.au
                            </Typography>
                        </IconButton>
                        <IconButton variant="body2" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <BusinessRoundedIcon fontSize="small" />
                            <Typography variant="body2" align="center" display="block">
                                14 Adelaide Street, Brisbane QLD 4000
                            </Typography>
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} align="center" className={classes.pages}>
                        <Typography variant="body2" display="block">
                            Pages
                        </Typography>
                        <Link variant="body2" onClick={() => {console.log('home clicked')}}>
                            Home
                        </Link>
                        <Link variant="body2" onClick={() => {console.log('plants clicked')}}>
                            Plants
                        </Link>
                        <Link variant="body2" onClick={() => {console.log('contact us clicked')}}>
                            Contact Us
                        </Link>
                        <Link variant="body2" onClick={() => {console.log('account clicked')}}>
                            Login to Account
                        </Link>
                    </Grid>
                </Grid>
            </BottomNavigation>
        </div>
    )
}

export default Footer
