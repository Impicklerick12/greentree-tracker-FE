import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'

const UserAccount = () => {

    const { store, dispatch } = useGlobalState()
    const { loggedInUser } = store

    function handleSubmit() {

    }

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const initialFormState = {
        username: "",
        email: "",
        business_name: "",
        password: ""
    }

    const [formState, setFormState] = useState(initialFormState)

    // useEffect(() => {
    //     loggedInUser && setFormState({
    //         username: loggedInUser.username,
    //         email: loggedInUser.email,
    //         business_name: loggedInUser.business_name,
    //         password: loggedInUser.password,
    //     }, [loggedInUser])
    // })

    return (
        <div>
        { loggedInUser ? (
            <>
                <h1>User Account</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input required type="text" name="username" value={loggedInUser.username} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input required type="email" name="email" value={formState.email} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Business Name</label>
                        <input required type="text" name="business_name" value={formState.business_name} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input required type="password" name="password" placeholder="Enter a new password" onChange={handleChange}></input>
                    </div>
                    <input type="submit" value="Register"></input>
                    
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
