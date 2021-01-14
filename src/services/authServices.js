import api from '../config/api'

export async function loginUser(userInfo) {
    // call to server to login user
    // return user info if successful and error if not
    const response = await api.post("/auth/login", userInfo)
    return response.data
}

export async function logoutUser() {
    // call to server to logout user
    return api.get("/auth/logout")
}

export async function registerUser(userInfo) {
    // call to server to register user
    const response = await api.post("/auth/register", userInfo)
    console.log("got user back from server", response)
    return response.data
}

export async function userAdmin() {
        const response = await api.get("/admin")
        return response
}
    
export async function userAuthenticated() {
    try {
        const response = await api.get("/auth/user")
        return response
    }
    catch(error) {
        console.log("an error occurred checking for authenticated user")
        throw(error)
    }
}

export async function findUser(user_id) {
    try {
        const response = await api.get(`/users/${user_id}`)
        return response
    }
    catch(error) {
        console.log("an error occurred user")
        throw(error)
    }
}

export async function updateUser(user) {
    try {
        const response = await api.put(`/users/${user._id}`, user)
        return response
    }
    catch(error) {
        console.log("an error occurred updating user")
    } 
}
    
export async function findAllUsers() {
    try {
        const response = await api.get(`/users`)
        return response
    }
    catch(error) {
        console.log("an error occurred finding all users")
        throw(error)
    }
}

// Get loggedInUser from localStorage
export function getLoggedInUser() {
    return localStorage.getItem("loggedInUser")
}

// Store loggedInUser username in local storage
export function setLoggedInUser(user) {
    localStorage.setItem("loggedInUser", user)
}

// Remove loggedInUser username from local storage
export function removeLoggedInUser() {
    localStorage.removeItem("loggedInUser")
}

// Get userId from localStorage
export function getUserId() {
    return localStorage.getItem("userId")
}

// Store loggedInUser username in local storage
export function setUserId(user_id) {
    localStorage.setItem("userId", user_id)
}

// Remove loggedInUser username from local storage
export function removeUserId() {
    localStorage.removeItem("userId")
}