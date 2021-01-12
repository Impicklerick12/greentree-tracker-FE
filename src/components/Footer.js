import React from 'react'
import { 
    Grid,
    BottomNavigation,
    Typography,
    Link
} from '@material-ui/core'

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
                    <Grid item xs={4}>
                        <Typography variant="body2" align="center" display="block">
                            <p><b>Contact</b></p>
                            <p><b>Telephone:</b> (07) 3800 1983</p>
                            <p><b>Email:</b> nursery@nurserywholesale.com.au</p>
                            <p><b>Address:</b> 14 Adelaide Street, Brisbane City QLD 4000</p>
                        </Typography>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Typography variant="body2" display="block">
                            <p><b>Pages</b></p>
                        </Typography>
                        <p>
                            <Link variant="body2" onClick={() => {console.log('home clicked');
                            }}>
                                Home
                            </Link>
                        </p>
                        <p>
                            <Link variant="body2" onClick={() => {console.log('plants clicked');
                            }}>
                                Plants
                            </Link>
                        </p>
                        <p>
                            <Link variant="body2" onClick={() => {console.log('contact us clicked');
                            }}>
                                Contact Us
                            </Link>
                        </p>
                        <p>
                            <Link variant="body2" onClick={() => {console.log('account clicked');
                            }}>
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
