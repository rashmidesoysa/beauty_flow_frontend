import api from './axios'

export const brandApi = {
    // Get all brands
    getAll: () => api.get('/api/admin/brands'),

    // Get single brand
    getById: (id) => api.get(`/api/admin/brands/${id}`),

    // Create brand
    create: (data) => {
        return api.post('/api/admin/brand/create', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    // Update brand
    update: (id, data) => {
        return api.post(`/api/admin/brand/update/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    // Delete brand
    delete: (id) => api.delete(`/api/admin/brand/delete/${id}`),
}