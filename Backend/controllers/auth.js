// Importo PrismaClient
const { PrismaClient } = require("@prisma/client");

// Inizializzo Prisma
const prisma = new PrismaClient();

// Importo hashPassword
const { hashPassword, comparePassword } = require("../utils/password.js");

// Importo generateToken
const generateToken = require("../utils/generateToken.js");

// Register
const register = async (req, res) => {

    try {

        const { email, name, password } = req.body;

        const data = {
            email,
            name,
            password: await hashPassword(password)
        }

        const user = await prisma.user.create({ data });

        const token = generateToken({
            email: user.email,
            name: user.name,
            isAdmin: false,
            isSuperAdmin: false
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });

    } catch (err) {
        console.error(err);
    }
}

// Login
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new Error("Email o password errati!");
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Email o password errati!");
        }

        const token = generateToken({
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            isSuperAdmin: user.isSuperAdmin
        });

        delete user.id;
        delete user.password;
        res.json({ token, data: user });

    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    register,
    login
}