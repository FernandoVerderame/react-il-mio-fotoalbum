// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

// Inizializzo Prisma
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Il titolo è obbligatorio!',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo deve essere una stringa!',
            bail: true
        },
        isLength: {
            errorMessage: 'Il titolo deve contenere almeno 5 caratteri!',
            options: { min: 5 }
        },
        trim: true
    },
    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'La descrizione è obbligatoria!',
            bail: true
        },
        isString: {
            errorMessage: 'La descrizione non può contenere solo numeri!',
            bail: true
        },
        isLength: {
            errorMessage: 'La descrizione deve contenere almeno 20 caratteri!',
            options: { min: 20 }
        },
        trim: true
    },
    visible: {
        in: ["body"],
        isBoolean: {
            errorMessage: 'Visible può essere solo vero o falso!'
        },
        toBoolean: true
    },
    categories: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'La categoria è obbligatoria!',
            bail: true
        },
        isArray: {
            errorMessage: 'Le categorie devono essere passate come array!',
            bail: true
        },
        custom: {
            options: async (idStrings) => {
                const ids = idStrings.map(id => parseInt(id));
                if (ids.length === 0) {
                    throw new Error(`Una foto deve avere almeno una categoria!`);
                }
                const notIntegerId = ids.find(id => isNaN(parseInt(id)));
                if (notIntegerId) {
                    throw new Error(`Uno o più ID non sono dei numeri interi.`);
                }
                const categories = await prisma.category.findMany({
                    where: { id: { in: ids } }
                });
                if (categories.length !== ids.length) {
                    throw new Error(`Uno o più categorie specificate non esistono!`);
                }
                return true;
            }
        },
        customSanitizer: {
            options: (ids) => ids.map(id => ({ id: parseInt(id) }))
        }
    }
}

module.exports = bodyData;