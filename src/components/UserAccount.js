import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { 
    findUser, 
    updateUser, 
    logoutUser, 
    removeLoggedInUser, 
    removeUserId 
} from '../services/authServices'

import { 
    CircularProgress,
    Grid,
    Button,
    TextField,
    Typography,
    Box
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        minHeight: 200,
        minWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2)
    },
    textField: {
        width: '100%'
    },
    notLoggedIn: {
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 300
    },
    links: {
        margin: theme.spacing(1)
    }
}))

const UserAccount = ({history}) => {

    const classes = useStyles()
    const { store, dispatch } = useGlobalState()
    const { loggedInUser, userId } = store
    
    useEffect(() => {
        if (loggedInUser) {
            setLoading(true)
            findUser(userId)
            .then((res) => {
                let user = res.data
                setFormState({
                    username: user.username,
                    email: user.email
                })
                setLoading(false)
            })
            .catch((error) => console.log(error))
        }
    },[])

    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedUser = {
            _id: loggedInUser,
            username: formState.username,
            email: formState.email
        }

        updateUser(updatedUser)
            .then((res) => {
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
                removeUserId()
                history.push('/auth/login')
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                if(status === 403)
                    setErrorMessage("You are not the user, and unable to edit the details")
                else
                    setErrorMessage("Well, this is embarrassing... There was a problem on the server.")
            })
    }

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
        setFormChange(true)
    }

    const initialFormState = {
        username: "",
        email: "",
    }

    const [formState, setFormState] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    const [formChange, setFormChange] = useState(false)
    const [loading, setLoading] = useState(false)

    return (
        <div>
        { loggedInUser ? (
            <Box py={4}>
                <Grid container justify="center">
                    <Box py={4}>
                        <Typography variant="body1" align="center">
                            Update your Greentree Tracker details
                        </Typography>
                    </Box>
                </Grid>
                <Grid container justify="center">
                    <Box py={4}>
                        <Typography variant="h2">Account</Typography>

                    </Box>
                    {errorMessage && <p>{errorMessage}</p>}
                    { formChange && (
                        <Grid container justify="center" className={classes.alert}>
                            <Alert severity="info">Upon updating your user information, you will be prompted to log in again.</Alert>
                        </Grid>
                    )}
                    { loading ? (
                        <Grid container justify="center">
                            <CircularProgress color="secondary" size={100}/>
                        </Grid>
                    ) : (
                            <Grid container justify="center">
                                <form onSubmit={handleSubmit} className={classes.form}>
                                    <div>
                                        <TextField
                                            required 
                                            className={classes.textField}
                                            variant="outlined"
                                            id="outlined" 
                                            type="text" 
                                            name="username" 
                                            label="username" 
                                            value={formState.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            required 
                                            className={classes.textField}
                                            variant="outlined"
                                            id="outlined" 
                                            type="text" 
                                            name="email" 
                                            label="email" 
                                            value={formState.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <Button 
                                        type="submit" 
                                        value="Update"
                                        color="primary"
                                        variant="contained"
                                    >
                                        Update
                                    </Button>
                                </form>
                            </Grid>
                    )}
                </Grid>
            </Box>
        ): (
            <Grid container justify="center" className={classes.notLoggedIn}>
                <Typography variant="h2">You are not logged in</Typography>
                <Grid item>
                    <Link 
                        component={Button} 
                        to="/auth/login" 
                        variant="contained" 
                        color="primary"
                        className={classes.links}
                    >
                        Login
                    </Link>
                    <Link 
                        component={Button} 
                        to="/auth/register" 
                        variant="outlined" 
                        color="secondary"
                        className={classes.links}
                    >
                        Register
                    </Link>
                </Grid>
            </Grid>
        )}
        </div>
    )
}


export default withRouter(UserAccount)
