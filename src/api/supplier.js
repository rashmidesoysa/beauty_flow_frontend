import api from './axios'

export const supplierApi = {
    // Get all suppliers
    getAll: () => api.get('/api/admin/suppliers'),

    // Get single supplier
    getById: (id) => api.get(`/api/admin/supplier/${id}`),

    // Create supplier
    create: (data) => api.post('/api/admin/supplier/create', data),

    // Update supplier
    update: (id, data) => api.put(`/api/admin/supplier/update/${id}`, data),

    // Delete supplier
    delete: (id) => api.delete(`/api/admin/supplier/delete/${id}`),

    // Update status
    updateStatus: (id, status) => api.post(`/api/admin/supplier/update-status/${id}`, { status }),
}