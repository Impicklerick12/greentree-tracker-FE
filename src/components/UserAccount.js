import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useGlobalState } from '../config/store'
import { findUser, updateUser, logoutUser, removeLoggedInUser } from '../services/authServices'
import Alert from '@material-ui/lab/Alert';

const UserAccount = ({history}) => {

    const { store, dispatch } = useGlobalState()
    const { loggedInUser } = store
    
    useEffect(() => {
        findUser(loggedInUser)
            .then((res) => {
                let user = res.data
                setFormState({
                    username: user.username,
                    email: user.email
                })
            })
            .catch((error) => console.log(error))
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

                history.push('/auth/login')
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                console.log("caught error on user edit", error)
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

    return (
        <div>
        { loggedInUser ? (
            <>
                <h1>User Account</h1>
                {errorMessage && <p>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input required type="text" name="username" value={formState.username} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input required type="email" name="email" value={formState.email} onChange={handleChange}></input>
                    </div>
                    { formChange && (
                        <Alert severity="info">Upon updating your user information, you will be prompted to log in again.</Alert>
                    )}
                    <input type="submit" value="Update"></input>
                </form>
            </>
        ): (
            <>
                <h2>You are not logged in</h2>
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/register">Register</Link>
            </>
        )}
        </div>
    )
}


export default withRouter(UserAccount)
