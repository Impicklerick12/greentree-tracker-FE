import axios from 'axios'

// Create an axios instance
export default axios.create({
  baseURL: 'https://limitless-springs-78183.herokuapp.com/', // DEPLOYED FROM KATRINAS HEROKU ACCOUNT
  // baseURL: 'https://murmuring-plateau-63722.herokuapp.com/', // DEPLOYED FROM MY HEROKU ACCOUNT
  // baseURL: 'http://localhost:3005/'
  timeout: 5000,
  withCredentials: true
})