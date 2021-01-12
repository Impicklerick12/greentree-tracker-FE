import React from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { logoutUser, removeLoggedInUser } from '../services/authServices'
import logo from '../images/logo.png';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    MenuItem,
    Menu,
    useMediaQuery
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import { 
    makeStyles,
    useTheme
} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black",
    },
    title: {
      flexGrow: 1,
      color: "black"
    }
  }));

const Navbar = ({history}) => {

    const menuLinks = {
        account: "My Account",
        plants: "Plants",
        contact: "contact",
        admin: "Admin",
        login: "login",
        logout: "logout",
        register: "Register"
    }

    // Logout user
    function handleLogout() {
        logoutUser().then((response) => {
            console.log("Got back response on logout", response.status)
        }).catch ((error) => {
            console.log("The server may be down - caught an exception on logout:", error)
        })
        // Even if we catch an error, logout the user locally
        dispatch({
            type: "setLoggedInUser",
            data: null
        })
        removeLoggedInUser()
    }

    const {store, dispatch} = useGlobalState()
    const {loggedInUser, quotePlants} = store

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"))

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleMenuClick = (pageURL) => {
        history.push(pageURL)
        setAnchorEl(null);
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h5" className={classes.title}>
                            Greentree Tracker
                        </Typography>
                        <div>
                            { quotePlants.length >= 1 && (
                                <IconButton
                                    onClick={() => handleMenuClick('/quote')}
                                    color="inherit"
                                >
                                    <ShoppingCartIcon />
                                </IconButton>
                            )}
                            {isMobile ? (
                                <>
                                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                        <MenuIcon style={{ color: 'black' }} />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                    {loggedInUser ? (
                                        <>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <HomeRoundedIcon onClick={() => handleMenuClick('/')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <AccountCircleRoundedIcon onClick={() => handleMenuClick('/account')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <EcoRoundedIcon onClick={() => handleMenuClick('/plants')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <PhoneRoundedIcon onClick={() => handleMenuClick('/contact')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <SupervisorAccountRoundedIcon onClick={() => handleMenuClick('/admin')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <ExitToAppRoundedIcon onClick={handleLogout} fontSize="large" />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <HomeRoundedIcon onClick={() => handleMenuClick('/')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <EcoRoundedIcon onClick={() => handleMenuClick('/plants')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <PhoneRoundedIcon onClick={() => handleMenuClick('/contact')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <AccountCircleRoundedIcon onClick={() => handleMenuClick('/auth/login')} fontSize="large" />
                                            </IconButton>
                                            <Button onClick={() => handleMenuClick('/auth/register')}>Register</Button>
                                        </>
                                    )}
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    { loggedInUser ? (
                                        <>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <HomeRoundedIcon onClick={() => handleMenuClick('/')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <AccountCircleRoundedIcon onClick={() => handleMenuClick('/account')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <EcoRoundedIcon onClick={() => handleMenuClick('/plants')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <PhoneRoundedIcon onClick={() => handleMenuClick('/contact')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <SupervisorAccountRoundedIcon onClick={() => handleMenuClick('/admin')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <ExitToAppRoundedIcon onClick={handleLogout} fontSize="large" />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <HomeRoundedIcon onClick={() => handleMenuClick('/')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <EcoRoundedIcon onClick={() => handleMenuClick('/plants')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <PhoneRoundedIcon onClick={() => handleMenuClick('/contact')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenu}>
                                                <AccountCircleRoundedIcon onClick={() => handleMenuClick('/auth/login')} fontSize="large" />
                                            </IconButton>
                                            <Button onClick={() => handleMenuClick('/auth/register')}>Register</Button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            <hr />
            </div>
        </>
    )
}

export default withRouter(Navbar)
