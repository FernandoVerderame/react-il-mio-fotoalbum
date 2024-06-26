// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

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
        console.error(err);
    }

}

// Index
const index = async (req, res, next) => {
    try {

        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (err) {
        console.error(err);
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
        console.error(err);
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
        console.error(err);
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
        console.error(err);
    }

}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}