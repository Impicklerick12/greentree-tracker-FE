import React, { useState } from 'react'
import { useGlobalState } from '../config/store'
import { loginUser, setLoggedInUser, setUserId } from '../services/authServices'
import { alertBanner } from './Alerts'

import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid,
    TextField,
    Typography,
    Button,
    Box
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1)
    },
    },
    textArea: {
        width: '100%'
    }
  }));

const Login = ({history}) => {

    const classes = useStyles();

    const initialFormState = {
        username: "",
        password: ""
    } 

    const [userDetails, setUserDetails] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    const { dispatch, store } = useGlobalState()

    const { loggedInUser } = store

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        // Attempt login on server
        loginUser(userDetails)
            .then((res) => {
                let currentUser = res.user
                console.log(currentUser)
                if (currentUser.role === "admin") {
                    dispatch({
                        type:'setAdmin',
                        data: true
                    })
                }
                setLoggedInUser(currentUser.username)
                setUserId(currentUser._id)
                dispatch({
                    type: "setLoggedInUser",
                    data: currentUser.username
                })
                dispatch({
                    type: "setUserId",
                    data: currentUser._id
                })
            })
            .catch((error) => {
                if (error.response && error.response.status === 401)
                    setErrorMessage("Authentication failed. Please check your username and password.")
                else   
                    setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
            })
    }

    function loggedInUserRedirect() {
        history.goBack()
    }
    
    return (
        <div>
            { loggedInUser ? (
                loggedInUserRedirect()
            ) : (
                <>
                    {errorMessage && alertBanner(errorMessage)}
                    <Box py={4}>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center">
                            <p>Welcome to Greentree Tracker!</p> 
                            <p>Customers are required to login to an active account to be able to request a quote from our team.</p>
                            </Typography>
                        </Grid>
                    </Box>
                    <Box py={4}>
                        <Grid container justify="center">
                            <Typography variant="h2">Log In</Typography>
                        </Grid>
                    </Box>
                    <Box py={4}>
                        <Grid container justify="center">
                            <Grid item xs={10} sm={8} md={6} lg={4}>
                                <form className={classes.root} onSubmit={handleSubmit}>
                                    <div>
                                        <TextField className={classes.textArea} required type="text" name="username" label="Username" onChange={handleChange}></TextField>
                                    </div>
                                    <div>
                                        <TextField className={classes.textArea} required type="password" name="password" label="Password" onChange={handleChange}></TextField>
                                    </div>
                                    <Button type="submit" value="Sign In">Sign In</Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box py={4}>
                        <Grid item xs={12} align="center">
                            <Typography variant="body2">
                                <a href="/auth/register">Create new Greentree Tracker accout</a>
                            </Typography>
                        </Grid>
                    </Box>
                </>
            )}
        </div>
    )
}

export default Login