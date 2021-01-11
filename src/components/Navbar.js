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
    useMediaQuery,
    ListItemIcon,
    ListItemText
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { 
    makeStyles,
    useTheme
} from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
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
                        <Typography variant="h6" className={classes.title}>
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
                            { isMobile ? (
                                <>
                                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
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
                                            <MenuItem onClick={() => handleMenuClick('/')} edge="start" color="inherit" aria-label="menu" title="Home">
                                                <ListItemIcon>
                                                    <HomeRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Home" />
                                            </MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/account')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <AccountCircleRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Account" />
                                            </MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/plants')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <EcoRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Plants" />
                                            </MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/contact')}edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <PhoneRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Contact" />
                                            </MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/admin')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <SupervisorAccountRoundedIcon fontSize="large" color="secondary"/>
                                                </ListItemIcon>
                                                <ListItemText primary="Admin" />
                                            </MenuItem>
                                            <MenuItem onClick={handleLogout} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <ExitToAppRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Logout" />
                                            </MenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <MenuItem onClick={() => handleMenuClick('/')} edge="start" color="inherit" aria-label="menu" title="Home">
                                                <ListItemIcon>
                                                    <HomeRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Home" />
                                            </MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/plants')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <EcoRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Plants" />
                                            </MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/contact')}edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <PhoneRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Contact" />
                                            </MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/auth/login')}edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <AccountCircleRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Login" />
                                            </MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/auth/register')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <CheckBoxOutlineBlankIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Register" />
                                            </MenuItem>
                                        </>
                                    )}
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    { loggedInUser ? (
                                        <>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Home" className={classes.menuButton}>
                                                <HomeRoundedIcon onClick={() => handleMenuClick('/')} fontSize="large"/>
                                            </IconButton>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Account" className={classes.menuButton}>
                                                <AccountCircleRoundedIcon onClick={() => handleMenuClick('/account')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Plants" className={classes.menuButton}>
                                                <EcoRoundedIcon onClick={() => handleMenuClick('/plants')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Contact Us" className={classes.menuButton}>
                                                <PhoneRoundedIcon onClick={() => handleMenuClick('/contact')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Admin" className={classes.menuButton}>
                                                <SupervisorAccountRoundedIcon onClick={() => handleMenuClick('/admin')} fontSize="large" color="secondary"/>
                                            </IconButton>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Logout" className={classes.menuButton}>
                                                <ExitToAppRoundedIcon onClick={handleLogout} fontSize="large" />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Home" className={classes.menuButton}>
                                                <HomeRoundedIcon onClick={() => handleMenuClick('/')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Plants" className={classes.menuButton}>
                                                <EcoRoundedIcon onClick={() => handleMenuClick('/plants')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Contact Us" className={classes.menuButton}>
                                                <PhoneRoundedIcon onClick={() => handleMenuClick('/contact')} fontSize="large" />
                                            </IconButton>
                                            <IconButton edge="start" color="inherit" aria-label="menu" title="Login" className={classes.menuButton}>
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
