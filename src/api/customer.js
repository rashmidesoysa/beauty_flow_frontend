import api from './axios'

export const customerApi = {
    // Customer Registration
    register: (userData) => {
        return api.post('/api/customer/register', userData)
    },

    // Customer Login
    login: (credentials) => {
        return api.post('/api/customer/login', credentials)
    },

    // Get Customer Profile
    getProfile: () => {
        return api.get('/api/customer/profile')
    },

    // Logout
    logout: () => {
        return api.post('/api/customer/logout')
    },

    // Update Profile
    updateProfile: (data) => {
        return api.put('/api/customer/profile', data)
    },
}