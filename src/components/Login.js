import React, { useState } from 'react'
import { useGlobalState } from '../config/store'
import { loginUser, setLoggedInUser, setAdmin } from '../services/authServices'

import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid,
    TextField,
    Typography,
    Button
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    container: {
        // height: '100vh'
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

        // For use when connecting to SERVER
        event.preventDefault()
        // Attempt login on server
        loginUser(userDetails).then((res) => {
            let currentUser = res.user
            console.log(currentUser)

            if (currentUser.role === "admin") {
                dispatch({
                    type:'setAdmin',
                    data: true
                })
                history.push('/admin')
            }

            setLoggedInUser(currentUser._id)
            dispatch({
                type: "setLoggedInUser",
                data: currentUser._id
            })
        }).catch((error) => {
            if (error.response && error.response.status === 401)
                setErrorMessage("Authentication failed. Please check your username and password.")
            else   
                setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
        })
    }

    function loggedInUserRedirect() {
        history.goBack()
    }

    // Login User - Will not need in production. Use handleSubmit function
    // function loginUser() {
    //     dispatch({
    //         type: "setLoggedInUser",
    //         data: userDetails.username
    //     })
    // }
    
    return (
        <Grid container>
            { loggedInUser ? (
                loggedInUserRedirect()
            ) : (
                <>
                    {errorMessage && <p>{errorMessage}</p>}
                    <Grid container justify="center">
                        <Typography variant="h2">Log In</Typography>
                    </Grid>
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
                </>
            )}
        </Grid>
    )
}

export default Login