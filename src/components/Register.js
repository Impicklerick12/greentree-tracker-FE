import React, { useState } from 'react'
import { useGlobalState } from '../config/store'
import { registerUser } from '../services/authServices'

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
    textArea: {
        width: '100%'
    }
  }));

const Register = ({history}) => {

    const classes = useStyles();

    const initialFormState = {
        username: "",
        email: "",
        password: ""
    } 

    const [userDetails, setUserDetails] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    const { dispatch } = useGlobalState()

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    function handleSubmit(event) {
        // event.preventDefault()
        // registerUser()
        // history.goBack()

        // CONNECTION TO SERVER IN DEPOLYMENT
        event.preventDefault()
        registerUser(userDetails).then(() => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.goBack()
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
			if(status === 409) {
				// This username is already registered. Let the user know.
				setErrorMessage("This username already exists. Please login, or specify another username.")				
            }
            else {
                // There was some other error - maybe the server or db is down
                setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
            }
			console.log(`registration failed with error: ${error} and status ${status}`)
        })
    }

    // Will not need this in production. Use handleSubmit function
    // function registerUser() {
    //     dispatch({
    //         type: "setLoggedInUser",
    //         data: userDetails.username
    //     })
    // }
 
    return (
        <>
            <div>
                {errorMessage && <p>{errorMessage}</p>}
                <Grid container justify="center">
                    <Typography variant="h2">Register</Typography>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={10} sm={8} md={6} lg={4}>
                        <form className={classes.root} onSubmit={handleSubmit}>
                            <div>
                                <TextField className={classes.textArea} id="standard-basic" required type="text" name="username" label="Username" onChange={handleChange}></TextField>
                            </div>
                            <div>
                                <TextField className={classes.textArea} id="standard-basic" required type="email" name="email" label="Email" onChange={handleChange}></TextField>
                            </div>
                            <div>
                                {/* <TextField className={classes.textArea} id="standard-basic" required type="text" name="business_name" label="Business Name" onChange={handleChange}></TextField> */}
                            </div>
                            <div>
                                <TextField className={classes.textArea} id="standard-basic" required type="password" name="password" label="Password" onChange={handleChange}></TextField>
                            </div>
                            <div>
                                {/* <TextField className={classes.textArea} id="standard-basic" required type="password" name="password_confirmation" label="Confirm Password" onChange={handleChange}></TextField> */}
                            </div>
                            <Button type="submit" value="Register">Register</Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Register
