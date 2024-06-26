// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

const {
    register,
    login
} = require("../controllers/auth.js");

// Rotta registrazione
router.post('/register', register);

// Rotta login 
router.post('/login', login);

module.exports = router;