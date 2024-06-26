require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password + process.env.PEPPER_KEY, 10);
    return hashPassword;
}

const photos = [
    {
        "id": 1,
        "title": "Tramonto sul mare",
        "slug": "tramonto-sul-mare",
        "image": "https://example.com/images/tramonto-sul-mare.jpg",
        "description": "Una splendida vista del tramonto sul mare.",
        "visible": true,
        "categories": [1, 3],
        "userId": 1
    },
    {
        "id": 2,
        "title": "Cattedrale gotica",
        "slug": "cattedrale-gotica",
        "image": "https://example.com/images/cattedrale-gotica.jpg",
        "description": "Un'imponente cattedrale in stile gotico.",
        "visible": true,
        "categories": [2, 4],
        "userId": 2
    },
    {
        "id": 3,
        "title": "Ritratto di una ragazza",
        "slug": "ritratto-di-una-ragazza",
        "image": "https://example.com/images/ritratto-di-una-ragazza.jpg",
        "description": "Un bellissimo ritratto di una ragazza.",
        "visible": true,
        "categories": [2, 3],
        "userId": 3
    },
    {
        "id": 4,
        "title": "Grattacieli di notte",
        "slug": "grattacieli-di-notte",
        "image": "https://example.com/images/grattacieli-di-notte.jpg",
        "description": "La skyline di una città con i grattacieli illuminati di notte.",
        "visible": true,
        "categories": [4],
        "userId": 1
    },
    {
        "id": 5,
        "title": "Foresta in autunno",
        "slug": "foresta-in-autunno",
        "image": "https://example.com/images/foresta-in-autunno.jpg",
        "description": "Un'affascinante foresta in autunno con foglie colorate.",
        "visible": true,
        "categories": [1],
        "userId": 2
    },
    {
        "id": 6,
        "title": "Ponti antichi",
        "slug": "ponti-antichi",
        "image": "https://example.com/images/ponti-antichi.jpg",
        "description": "Un antico ponte di pietra che attraversa un fiume.",
        "visible": true,
        "categories": [2, 3],
        "userId": 3
    },
    {
        "id": 7,
        "title": "Ritratto di un anziano",
        "slug": "ritratto-di-un-anziano",
        "image": "https://example.com/images/ritratto-di-un-anziano.jpg",
        "description": "Un ritratto di un uomo anziano con molte storie da raccontare.",
        "visible": true,
        "categories": [1, 3],
        "userId": 1
    },
    {
        "id": 8,
        "title": "Viali cittadini",
        "slug": "viali-cittadini",
        "image": "https://example.com/images/viali-cittadini.jpg",
        "description": "Una vista panoramica di viali cittadini affollati.",
        "visible": true,
        "categories": [1, 2],
        "userId": 2
    },
    {
        "id": 9,
        "title": "Fiori di campo",
        "slug": "fiori-di-campo",
        "image": "https://example.com/images/fiori-di-campo.jpg",
        "description": "Colorati fiori di campo sotto il sole primaverile.",
        "visible": true,
        "categories": [3],
        "userId": 3
    }
]

const categories = [
    {
        "id": 1,
        "name": "Natura",
        "color": "#C30A18",
    },
    {
        "id": 2,
        "name": "Architettura",
        "color": "#0908FC",
    },
    {
        "id": 3,
        "name": "Ritratti",
        "color": "#08964B",
    },
    {
        "id": 4,
        "name": "Città",
        "color": "#6B3594",
    }
]

const users = [
    {
        "id": 1,
        "email": "johndoe@example.com",
        "name": "John Doe",
        "password": "securepassword123",
        "isAdmin": true,
        "isSuperAdmin": true,
    },
    {
        "id": 2,
        "email": "janesmith@example.com",
        "name": "Jane Smith",
        "password": "anothersecurepassword456",
        "isAdmin": true,
        "isSuperAdmin": false,
    },
    {
        "id": 3,
        "email": "alicejones@example.com",
        "name": "Alice Jones",
        "password": "yetanotherpassword789",
        "isAdmin": false,
        "isSuperAdmin": true,
    }
]

const messages = [
    {
        "id": 1,
        "email": "visitor@example.com",
        "content": "Adoro le tue foto!",
        "userId": 2
    },
    {
        "id": 2,
        "email": "johndoe@example.com",
        "content": "Grazie per i vostri commenti!",
        "userId": 1
    },
    {
        "id": 3,
        "email": "janesmith@example.com",
        "content": "Le tue foto di architettura sono incredibili!",
        "userId": 2
    },
    {
        "id": 4,
        "email": "alicejones@example.com",
        "content": "Che splendidi ritratti!",
        "userId": 3
    },
    {
        "id": 5,
        "email": "artlover@example.com",
        "content": "Mi piacerebbe acquistare una stampa di 'Fiori di campo'.",
        "userId": 1
    }
]

// Categorie
prisma.category.createMany({
    data: categories
})
    .then()
    .catch(err => console.error(err));

// Utenti
users.forEach(async (user) => {
    const { id, email, name, password, isAdmin, isSuperAdmin } = user;

    const passwordDb = await hashPassword(password);

    const data = {
        id,
        email,
        name,
        password: passwordDb,
        isAdmin,
        isSuperAdmin
    };

    prisma.user.create({ data }).then().catch(err => console.error(err));
})

// Messages
prisma.message.createMany({
    data: messages
})
    .then()
    .catch(err => console.error(err));



photos.forEach(photo => {

    const { id, title, slug, image, description, categories, userId, visible } = photo;

    const data = {
        id,
        title,
        slug,
        image,
        description,
        userId,
        visible,
        categories: { connect: categories.map(id => ({ id })) }
    }

    prisma.photo.create({ data }).then().catch(err => console.error(err));

})
