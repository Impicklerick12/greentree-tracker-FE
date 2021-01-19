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
    footer: {
        position: 'relative',
        width: '100%',
        bottom: 0,
        backgroundColor: 'black',
        color: 'white',
        padding: theme.spacing(2)
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
    },
    contact: {
        color: 'white'
    },
    contactIcons: {
        paddingRight: theme.spacing(1)
    },
    pageHeader: {
        paddingBottom: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'row',
            justifyContent: 'space-around'
        }
    }
}));

const Footer = () => {

    const classes = useStyles()

    return (
        <Grid container className={classes.footer}>
            <Grid item xs={12} sm={4} className={classes.disclaimer}>
                <Typography variant="body2" align="center" component="p">
                    <strong>Disclaimer</strong>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4} align="center" className={classes.info}>
                <Typography variant="body2" align="center" >
                    <strong>Contact</strong>
                </Typography>
                <IconButton className={classes.contact}>
                    <PhoneRoundedIcon fontSize="small" className={classes.contactIcons}/>
                    <Typography variant="body2" align="center">
                        (07) 3800 1983
                    </Typography>
                </IconButton>
                <IconButton className={classes.contact}>
                    <EmailRoundedIcon fontSize="small" className={classes.contactIcons}/>
                    <Typography variant="body2" align="center">
                        nursery@nurserywholesale.com.au
                    </Typography>
                </IconButton> 
                <IconButton className={classes.contact}>
                    <BusinessRoundedIcon fontSize="small" className={classes.contactIcons}/>
                    <Typography variant="body2" align="center">
                        14 Adelaide Street, Brisbane QLD 4000
                    </Typography>
                </IconButton>
            </Grid>
            <Grid item xs={12} sm={4} align="center">
                <Typography variant="body2" className={classes.pageHeader}>
                    <strong>Pages</strong>
                </Typography>
                <Typography variant="body2" className={classes.links}>
                    <a href="/">Home</a>
                    <a href="/plants">Plants</a>
                    <a href="/contact">Contact Us</a>
                    <a href="/auth/login">Login</a>
                    <a href="/auth/login">Register</a>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer;
