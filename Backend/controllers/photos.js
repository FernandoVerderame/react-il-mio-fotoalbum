// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

const errorHandler = require("../middlewares/errorHandler.js");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Importo la funzione per generare lo slug
const createSlug = require("../utils/slug.js");

// Store
const store = async (req, res) => {

    const { title, image, description, categories } = req.body;

    // Genero lo slug
    const slug = createSlug(title);

    const data = {
        title,
        slug: slug,
        image: image ? image : '',
        description,
        visible: req.body.visible ? true : false,
        categories: {
            connect: categories.map(id => ({ id: parseInt(id) }))
        }
    }

    try {
        const photo = await prisma.photo.create({
            data
        });
        res.status(200).send(photo);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Index
const index = async (req, res) => {
    try {
        const where = {};
        const { visible, title, page = 1, limit = 9 } = req.query;

        // Filtro pubblicato
        if (visible === 'true') {
            where.visible = true
        } else if (visible === 'false') {
            where.visible = false
        }

        // Filtro per titolo
        if (title) {
            where.title = { contains: title }
        }

        // Paginazione
        const offset = (page - 1) * limit;

        const totalItems = await prisma.photo.count({ where });
        const totalPages = Math.ceil(totalItems / limit);

        if (page > totalPages) {
            throw new Error(`La pagina ${page} non esiste.`);
        }

        const photos = await prisma.photo.findMany({
            where,
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true,
                        color: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            take: parseInt(limit),
            skip: parseInt(offset)
        });
        res.json({
            data: photos,
            page,
            totalItems,
            totalPages
        });
    } catch (err) {
        errorHandler(err, req, res);
    }

}

// Show
const show = async (req, res) => {
    try {
        const { slug } = req.params;
        const photo = await prisma.photo.findUnique({
            where: { slug },
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        if (photo) {
            res.json(photo);
        } else {
            throw new Error(`Foto con slug: ${slug} non trovata.`, 404);
        }

    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Update
const update = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, description, image, categories } = req.body;

        // Genero lo slug
        const newSlug = createSlug(title);

        const data = {
            title,
            slug: newSlug,
            image: image ? image : '',
            description,
            visible: req.body.visible ? true : false,
            categories: {
                set: categories.map(id => ({ id: parseInt(id) }))
            }
        }

        const photo = await prisma.photo.update({
            where: { slug },
            data,
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        res.json(photo);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Destroy
const destroy = async (req, res) => {
    try {
        const { slug } = req.params;
        await prisma.photo.delete({
            where: { slug }
        });
        res.json(`Foto con slug: ${slug} eliminato con successo.`);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}