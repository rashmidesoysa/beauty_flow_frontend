import api from './axios'

export const subcategoryApi = {
    // Get all subcategories
    getAll: () => api.get('/api/admin/sub-categories'),

    // Get single subcategory
    getById: (id) => api.get(`/api/admin/sub-category/${id}`),

    // Create subcategory
    create: (data) => {
        return api.post('/api/admin/sub-category/create', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    // Update subcategory
    update: (id, data) => {
        return api.post(`/api/admin/sub-category/update/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },

    // Delete subcategory
    delete: (id) => api.delete(`/api/admin/sub-category/delete/${id}`),
}