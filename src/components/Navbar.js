import React from 'react'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { logoutUser, removeLoggedInUser } from '../services/authServices'


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
                                            <MenuItem onClick={() => handleMenuClick('/')}>Home</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/account')}>My Account</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/plants')}>Plants</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/contact')}>Contact</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/admin')}>Admin</MenuItem>
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </>
                                    ) : (
                                        <>
                                            <MenuItem onClick={() => handleMenuClick('/')}>Home</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/plants')}>Plants</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/contact')}>Contact</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/auth/login')}>Login</MenuItem>
                                            <MenuItem onClick={() => handleMenuClick('/auth/register')}>Register</MenuItem>
                                        </>
                                    )}
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    { loggedInUser ? (
                                        <>
                                            <Button onClick={() => handleMenuClick('/')}>Home</Button>
                                            <Button onClick={() => handleMenuClick('/account')}>My Account</Button>
                                            <Button onClick={() => handleMenuClick('/plants')}>Plants</Button>
                                            <Button onClick={() => handleMenuClick('/contact')}>Contact</Button>
                                            <Button onClick={() => handleMenuClick('/admin')}>Admin</Button>
                                            <Button onClick={handleLogout}>Logout</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => handleMenuClick('/')}>Home</Button>
                                            <Button onClick={() => handleMenuClick('/plants')}>Plants</Button>
                                            <Button onClick={() => handleMenuClick('/contact')}>Contact</Button>
                                            <Button onClick={() => handleMenuClick('/auth/login')}>Login</Button>
                                            <Button onClick={() => handleMenuClick('/auth/register')}>Register</Button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
            <hr></hr>
            </div>
        </>
    )
}

export default withRouter(Navbar)
