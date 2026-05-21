import axios from 'axios'

const shopApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

export const shopService = {
    // Get all items with filters
    getItems: (params = {}) => {
        // Remove undefined or empty values
        const filteredParams = {}
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== '' && params[key] !== null) {
                filteredParams[key] = params[key]
            }
        })
        console.log('Sending API request with params:', filteredParams)
        return shopApi.get('/api/shop/items', { params: filteredParams })
    },

    // Get categories with item counts
    getCategories: () => {
        return shopApi.get('/api/shop/categories')
    },

    // Get single item details
    getItemDetails: (id) => {
        return shopApi.get(`/api/shop/item/${id}`)
    },
}