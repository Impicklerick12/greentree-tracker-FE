import React from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { logoutUser, removeLoggedInUser, removeUserId } from '../services/authServices'

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
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
      color: "white",
    },
    title: {
      flexGrow: 1,
      color: "white"
    }
  }));

const Navbar = ({history}) => {

    const {store, dispatch} = useGlobalState()
    const {loggedInUser, quotePlants, admin } = store

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"))

    // Logout user
    function handleLogout() {
        logoutUser()
            .then((response) => {
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
            removeUserId()
            history.push('/auth/login')
    }

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
                <AppBar position="static" style={{ background: 'black', boxShadow: 'none' }}>
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
                            { isMobile ? (
                                <>
                                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                                        <MenuIcon style={{ color: 'white' }} />
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
                                            <MenuItem id="home" onClick={() => handleMenuClick('/')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <HomeRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Home" />
                                            </MenuItem>
                                            <MenuItem id="account" onClick={() => handleMenuClick('/account')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <AccountCircleRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Account" />
                                            </MenuItem>
                                            <MenuItem id="plants" onClick={() => handleMenuClick('/plants')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <EcoRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Plants" />
                                            </MenuItem>
                                            <MenuItem id="contact" onClick={() => handleMenuClick('/contact')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <PhoneRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Contact" />
                                            </MenuItem>
                                            { admin && (
                                                <MenuItem id="admin" onClick={() => handleMenuClick('/admin')} edge="start" color="inherit" aria-label="menu">
                                                    <ListItemIcon>
                                                        <SupervisorAccountRoundedIcon fontSize="large" color="secondary"/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Admin" />
                                                </MenuItem>
                                            )}
                                            <MenuItem id="logout" onClick={handleLogout} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <ExitToAppRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Logout" />
                                            </MenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <MenuItem id="home" onClick={() => handleMenuClick('/')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <HomeRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Home" />
                                            </MenuItem>
                                            <MenuItem id="plants" onClick={() => handleMenuClick('/plants')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <EcoRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Plants" />
                                            </MenuItem>
                                            <MenuItem id="contact" onClick={() => handleMenuClick('/contact')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <PhoneRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Contact" />
                                            </MenuItem>
                                            <MenuItem id="login" onClick={() => handleMenuClick('/auth/login')} edge="start" color="inherit" aria-label="menu">
                                                <ListItemIcon>
                                                    <AccountCircleRoundedIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Login" />
                                            </MenuItem>
                                            {/* <MenuItem id="register" onClick={() => handleMenuClick('/auth/register')} edge="start" aria-label="menu">
                                                <ListItemIcon>
                                                    <CheckBoxOutlineBlankIcon fontSize="large" className={classes.menuButton}/>
                                                </ListItemIcon>
                                                <ListItemText primary="Register" />
                                            </MenuItem> */}
                                        </>
                                    )}
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    { loggedInUser ? (
                                        <>
                                            <IconButton id="home" edge="start" color="inherit" aria-label="menu" title="Home" className={classes.menuButton} onClick={() => handleMenuClick('/')}>
                                                <HomeRoundedIcon fontSize="large"/>
                                            </IconButton>
                                            <IconButton id="account" edge="start" color="inherit" aria-label="menu" title="Account" className={classes.menuButton} onClick={() => handleMenuClick('/account')}>
                                                <AccountCircleRoundedIcon fontSize="large" />
                                            </IconButton>
                                            <IconButton id="plants" edge="start" color="inherit" aria-label="menu" title="Plants" className={classes.menuButton} onClick={() => handleMenuClick('/plants')}>
                                                <EcoRoundedIcon fontSize="large" />
                                            </IconButton>
                                            <IconButton id="contact" edge="start" color="inherit" aria-label="menu" title="Contact Us" className={classes.menuButton} onClick={() => handleMenuClick('/contact')}>
                                                <PhoneRoundedIcon fontSize="large" />
                                            </IconButton>
                                            { admin && (
                                                <IconButton id="admin" edge="start" color="inherit" aria-label="menu" title="Admin" className={classes.menuButton} onClick={() => handleMenuClick('/admin')}>
                                                    <SupervisorAccountRoundedIcon fontSize="large" color="secondary"/>
                                                </IconButton>
                                            )}
                                            <IconButton id="logout" edge="start" color="inherit" aria-label="menu" title="Logout" className={classes.menuButton} onClick={handleLogout}>
                                                <ExitToAppRoundedIcon fontSize="large" />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton 
                                                aria-label="menu" 
                                                title="Home" 
                                                className={classes.menuButton} 
                                                onClick={() => handleMenuClick('/')} 
                                                id="home"
                                            >
                                                <HomeRoundedIcon fontSize="large" />
                                            </IconButton>
                                            <IconButton id="plants" edge="start" color="inherit" aria-label="menu" title="Plants" className={classes.menuButton} onClick={() => handleMenuClick('/plants')}>
                                                <EcoRoundedIcon fontSize="large" />
                                            </IconButton>
                                            <IconButton id="contact" edge="start" color="inherit" aria-label="menu" title="Contact Us" className={classes.menuButton} onClick={() => handleMenuClick('/contact')}>
                                                <PhoneRoundedIcon fontSize="large" />
                                            </IconButton>
                                            <IconButton 
                                                edge="start" 
                                                color="inherit" 
                                                aria-label="menu" 
                                                title="Login" 
                                                className={classes.menuButton} 
                                                onClick={() => handleMenuClick('/auth/login')}
                                                id="login"
                                            >
                                                <AccountCircleRoundedIcon fontSize="large" />
                                            </IconButton>
                                            {/* <Button id="register" onClick={() => handleMenuClick('/auth/register')} style={{ color: 'white'}}>Register</Button> */}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}

export default withRouter(Navbar)
