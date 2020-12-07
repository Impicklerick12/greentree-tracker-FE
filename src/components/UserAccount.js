import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { useGlobalState } from '../config/store'

const UserAccount = () => {

    const { store, dispatch } = useGlobalState()
    const { loggedInUser } = store

    return (
        <div>
        { loggedInUser ? (
            <>
                <h1>User Account</h1>

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
