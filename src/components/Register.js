import React, { useState } from 'react'
import { useGlobalState } from '../config/store'
import { registerUser } from '../services/authServices'

const Register = ({history}) => {

    const initialFormState = {
        username: "",
        email: "",
        business_name: "",
        password: ""
    } 

    const [userDetails, setUserDetails] = useState(initialFormState)
    // const [errorMessage, setErrorMessage] = useState(null)
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
        event.preventDefault()
        registerUser()
        history.goBack()

        // CONNECTION TO SERVER IN DEPOLYMENT

        // event.preventDefault()
        // registerUser(userDetails).then(() => {
        //     dispatch({
        //         type: "setLoggedInUser",
        //         data: userDetails.username
        //     })
        //     history.goBack()
        // }).catch((error) => {
        //     const status = error.response ? error.response.status : 500
		// 	if(status === 409) {
		// 		// This username is already registered. Let the user know.
		// 		setErrorMessage("This username already exists. Please login, or specify another username.")				
        //     }
        //     else {
        //         // There was some other error - maybe the server or db is down
        //         setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
        //     }
		// 	console.log(`registration failed with error: ${error} and status ${status}`)
        // })
    }

    // Will not need this in production. Use handleSubmit function
    function registerUser() {
        dispatch({
            type: "setLoggedInUser",
            data: userDetails.username
        })
    }
 
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input required type="text" name="username" placeholder="Enter a username" onChange={handleChange}></input>
            </div>
            <div>
                <label>Email</label>
                <input required type="email" name="email" placeholder="Enter an email" onChange={handleChange}></input>
            </div>
            <div>
                <label>Business Name</label>
                <input required type="text" name="business_name" placeholder="Business Name" onChange={handleChange}></input>
            </div>
            <div>
                <label>Password</label>
                <input required type="password" name="password" placeholder="Enter a password" onChange={handleChange}></input>
            </div>
            <input type="submit" value="Register"></input>
            
        </form>
    )
}

export default Register
