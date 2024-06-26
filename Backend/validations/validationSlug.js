// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Validazione tramite slug delle foto
const validationSlug = {
    slug: {
        in: ["params"],
        custom: {
            options: async (value) => {
                const slug = await prisma.photo.findUnique({ where: { slug: value } });

                if (!slug) throw new Error(`Non esiste una foto con slug: ${value}!`);

                return true;
            }

        }
    }
}

module.exports = validationSlug;