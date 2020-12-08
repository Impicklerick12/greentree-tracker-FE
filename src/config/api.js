import axios from 'axios'

// Create an axios instance
export default axios.create({
  baseURL: 'https://limitless-springs-78183.herokuapp.com/',
  timeout: 5000,
  withCredentials: true
})