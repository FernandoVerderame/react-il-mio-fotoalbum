// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

const errorHandler = require("../middlewares/errorHandler.js");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Store
const store = async (req, res, next) => {

    const { name, color } = req.body;

    const data = {
        name,
        color
    }

    try {
        const category = await prisma.category.create({ data });
        res.status(200).send(category);
    } catch (err) {
        errorHandler(err, req, res);
    }

}

// Index
const index = async (req, res, next) => {
    try {

        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Show
const show = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.findUnique({
            where: { id }
        });
        if (category) {
            res.json(category);
        } else {
            throw new Error(`Category con id ${id} non trovata.`, 404);
        }
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Update
const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.update({
            where: { id },
            data: req.body,
        });
        res.json(category);
    } catch (err) {
        errorHandler(err, req, res);
    }
}

// Destroy
const destroy = async (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        await prisma.category.delete({
            where: { id },
        });
        res.json(`Category con id ${id} eliminata con successo.`);
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