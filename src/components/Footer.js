import React from 'react'
import { 
    Grid,
    Box,
    BottomNavigation
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
            <BottomNavigation
                showLabels
                className={classes.root}
                >
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </div>
    )
}

export default Footer
