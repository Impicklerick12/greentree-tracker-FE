import React from 'react'
import { 
    Grid,
    Box,
    BottomNavigation,
    Typography
} from '@material-ui/core'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
                            <p><b>Disclaimer:</b></p>
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
                    <Grid item xs={4}>
                        <Typography variant="body2" align="center" display="block">
                            <p><b>Links</b></p>
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                        </Typography>
                    </Grid>
                </Grid>
            </BottomNavigation>
        </div>
    )
}

export default Footer
