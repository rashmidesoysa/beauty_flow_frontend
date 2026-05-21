// Build full image URL from relative path
export const getImageUrl = (path) => {
    if (!path) return null
    if (path.startsWith('http')) return path
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    return `${baseUrl}/storage/${path}`
}

// Generate SEO-friendly slug
export const generateSlug = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}