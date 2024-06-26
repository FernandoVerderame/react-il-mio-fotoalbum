// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il controller delle foto
const {
    store,
    index,
    show,
    update,
    destroy
} = require("../controllers/photos.js");

// Rotta index
router.get('/', index);

// Rotta show
router.get('/:slug', show);

// Rotta store
router.post('/', store);

// Rotta update
router.put('/:slug', update);

//Rotta destroy
router.delete('/:slug', destroy);

module.exports = router;
