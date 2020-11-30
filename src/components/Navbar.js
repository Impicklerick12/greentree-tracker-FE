import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Container
} from "@material-ui/core"
import { Home } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

import {
    Landing,
    Login,
    Register,
    UserAccount,
    Plants,
    QuoteRequest,
    Contact,
    Admin,
    NotFound
} from '../Exports'

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    }
});

const Navbar = () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                        {/* Logo Here */}
                        <IconButton edge="start" color="inherit" aria-label="home">
                            <Home fontSize="large" />
                        </IconButton>
                        <List 
                            component="nav" 
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
                        >
                            <Link to="/" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>
                            <Link to="/login" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="Login" />
                                </ListItem>
                            </Link>
                            <Link to="/register" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="Register" />
                                </ListItem>
                            </Link>
                            <Link to="/account" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="Account" />
                                </ListItem>
                            </Link>
                            <Link to="/plants" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="Plants" />
                                </ListItem>
                            </Link>
                            <Link to="/quote" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="Quote" />
                                </ListItem>
                            </Link>
                            <Link to="/contact" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="Contact" />
                                </ListItem>
                            </Link>
                            <Link to="/admin" className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary="Admin" />
                                </ListItem>
                            </Link>
                        </List>
                    </Container>
                </Toolbar>
            </AppBar>
            <Switch>
                {/* Home Component */}
                <Route exact path="/"><Landing /></Route>

                {/* Login Component */}
                <Route exact path="/login"><Login /></Route>

                {/* Register Component */}
                <Route exact path="/register"><Register /></Route>

                {/* UserAccount Component */}
                <Route exact path="/account"><UserAccount /></Route>

                {/* Plants Component */}
                <Route exact path="/plants"><Plants /></Route>

                {/* Quote Request Component */}
                <Route exact path="/quote"><QuoteRequest /></Route>

                {/* Contact Component */}
                <Route exact path="/contact"><Contact /></Route>

                {/* Admin Component */}
                <Route exact path="/admin"><Admin /></Route>

                {/* Not found component which will display if a URL doesn't match a route */}
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navbar
