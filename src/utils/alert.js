import Swal from 'sweetalert2'

export const showAlert = {
    // Success message
    success: (title, message = '', timer = 3000) => {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            timer: timer,
            showConfirmButton: true,
            confirmButtonColor: '#ec4899',
            timerProgressBar: true,
        })
    },

    // Error message
    error: (title, message = '') => {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            confirmButtonColor: '#ef4444',
        })
    },

    // Warning / confirmation dialog
    confirmDelete: (itemName) => {
        return Swal.fire({
            title: 'Are you sure?',
            html: `You are about to delete <strong>${itemName}</strong>.<br />This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        })
    },

    // Info message
    info: (title, message = '') => {
        return Swal.fire({
            icon: 'info',
            title: title,
            text: message,
            confirmButtonColor: '#3b82f6',
        })
    },
}