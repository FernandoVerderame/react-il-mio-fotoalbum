// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo le funzioni delle categorie
const {
    store,
    index,
    show,
    update,
    destroy
} = require("../controllers/categories.js");

// Rotta store
router.post('/', store);

// Rotta index
router.get('/', index);

// Rotta show
router.get('/:id', show);

// Rotta update
router.put('/:id', update);

// Rotta destroy
router.delete('/:id', destroy);

module.exports = router;