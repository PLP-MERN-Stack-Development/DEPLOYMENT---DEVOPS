// src/services/bugService.js
import axios from 'axios'

// Use environment variable for API URL, fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create a reusable Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Global response interceptor to simplify error handling
api.interceptors.response.use(
  response => response.data, // Return only response data
  error => {
    if (error.response) {
      // Server responded with a status code outside 2xx
      return Promise.reject({
        message: error.response.data.error || 'Request failed',
        status: error.response.status,
        response: error.response
      })
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: 'No response from server',
        request: error.request
      })
    } else {
      // Request setup error
      return Promise.reject({
        message: error.message
      })
    }
  }
)

// Bug API services
export const getBugs = () => api.get('/bugs')
export const getBugById = (id) => api.get(`/bugs/${id}`)
export const createBug = (bugData) => api.post('/bugs', bugData)
export const updateBug = (id, bugData) => api.put(`/bugs/${id}`, bugData)
export const deleteBug = (id) => api.delete(`/bugs/${id}`)
