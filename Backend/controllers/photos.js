// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

const errorHandler = require("../middlewares/errorHandler.js");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Importo la funzione per generare lo slug
const createSlug = require("../utils/slug.js");

// Importo la delete pic
const deletePic = require("../utils/deletePic.js");

// Importo jwt
const jwt = require("jsonwebtoken");

// Importo host e port
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

// Store
const store = async (req, res) => {

    const { title, description, categories } = req.body;

    // Recupero l'ID dell'utente tramite il token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    const userId = user.id;

    // Genero lo slug
    const slug = createSlug(title);

    const data = {
        title,
        slug: slug,
        image: req.file ? `${HOST}:${port}/photo_pics/${req.file.filename}` : '',
        description,
        visible: req.body.visible ? true : false,
        userId,
        categories: {
            connect: categories.map(category => ({ id: category.id }))
        }
    }

    try {
        const photo = await prisma.photo.create({
            data
        });
        res.status(200).send(photo);
    } catch (err) {
        if (req.file) {
            deletePic('photo_pics', req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

// Index
const index = async (req, res) => {
    try {
        const where = {};
        const { visible, title, page = 1, limit = 9, user } = req.query;

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

        if (totalPages === 0) {
            return res.json({
                data: [],
                page,
                totalItems,
                totalPages
            });
        }

        if (page > totalPages) {
            throw new Error(`La pagina ${page} non esiste.`);
        }

        // Filtro delle foto per lo user
        let userId;

        if (req.headers.authorization) {

            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userEmail = decoded.email;
            const user = await prisma.user.findUnique({ where: { email: userEmail } });
            userId = user.id;
        }

        // Filtro dello user
        if (user === 'true' && userId) {
            where.userId = userId
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
        const { title, description, categories } = req.body;

        // Genero lo slug
        const newSlug = createSlug(title);

        const data = {
            title,
            slug: newSlug,
            image: req.file ? `${HOST}:${port}/photo_pics/${req.file.filename}` : '',
            description,
            visible: req.body.visible ? true : false,
            categories: {
                set: categories.map(category => ({ id: category.id }))
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
        if (req.file) {
            deletePic('photo_pics', req.file.filename);
        }
        errorHandler(err, req, res);
    }
}

// Destroy
const destroy = async (req, res) => {
    try {
        const { slug } = req.params;
        const photo = await prisma.photo.delete({
            where: { slug }
        });

        const imageName = photo.image.replace(`${HOST}:${PORT}/photo_pics/`, '');

        if (photo.image) deletePic('photo_pics', imageName);

        res.status(200).json(`Foto con slug: ${slug} eliminato con successo.`);
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