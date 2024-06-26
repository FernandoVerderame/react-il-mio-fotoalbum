// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Store
const store = async (req, res, next) => {

    const { email, content } = req.body;

    const data = {
        email,
        content,
        userId: 1
    }

    try {
        const message = await prisma.message.create({ data });
        res.status(200).send(message);
    } catch (err) {
        console.error(err);
    }

}

// Index
const index = async (req, res, next) => {
    try {

        const messages = await prisma.message.findMany();
        res.json(messages);
    } catch (err) {
        console.error(err);
    }
}

// Show
const show = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const message = await prisma.message.findUnique({
            where: { id }
        });
        if (message) {
            res.json(message);
        } else {
            throw new Error(`Messaggio con id ${id} non trovato.`, 404);
        }
    } catch (err) {
        console.error(err);
    }
}

// Destroy
const destroy = async (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        await prisma.message.delete({
            where: { id },
        });
        res.json(`Messaggio con id ${id} eliminato con successo.`);
    } catch (err) {
        console.error(err);
    }

}

module.exports = {
    store,
    index,
    show,
    destroy
}