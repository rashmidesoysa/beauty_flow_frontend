import api from './axios'

export const itemApi = {
    getAll: () => api.get('/api/admin/items'),
    getById: (id) => api.get(`/api/admin/item/${id}`),
    create: (data) => api.post('/api/admin/item/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => api.post(`/api/admin/item/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/api/admin/item/delete/${id}`),
    updateStatus: (id) => api.post(`/api/admin/item/update-status/${id}`),
}