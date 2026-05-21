import api from './axios'

export const categoryApi = {
    // Get all categories
    getAll: () => api.get('/api/admin/categories'),

    // Get single category
    getById: (id) => api.get(`/api/admin/category/${id}`),

    // Create category (with image)
    create: (data) => {
        return api.post('/api/admin/category/create', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    // Update category (with optional image)
    update: (id, data) => {
        return api.post(`/api/admin/category/update/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    // Delete category
    delete: (id) => api.delete(`/api/admin/category/delete/${id}`),

}