// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il validatore
const validator = require("../middlewares/validator.js");

// Importo le validazioni dell'users
const { registerBody, loginBody } = require("../validations/users.js");

const {
    register,
    login
} = require("../controllers/auth.js");

// Rotta registrazione
router.post('/register', validator(registerBody), register);

// Rotta login 
router.post('/login', validator(loginBody), login);

module.exports = router;