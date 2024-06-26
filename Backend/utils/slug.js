// Creazione dello slug
const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

module.exports = createSlug;