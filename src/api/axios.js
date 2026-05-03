import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('Axios interceptor caught error:', error.response?.status, error.response?.data)

        // Get the current URL path
        const currentPath = window.location.pathname
        const isLoginPage = currentPath === '/admin/login' || currentPath === '/admin/register'

        // Only handle 401 for non-login pages AND not during login attempt
        if (error.response?.status === 401 && !isLoginPage) {
            // Check if we have a token (meaning user was logged in)
            const token = localStorage.getItem('admin_token')
            if (token) {
                localStorage.removeItem('admin_token')
                localStorage.removeItem('admin_user')
                window.location.href = '/admin/login'
                toast.error('Session expired. Please login again.')
            }
        }

        // Always reject the error so it can be handled by the component
        return Promise.reject(error)
    }
)

export default api