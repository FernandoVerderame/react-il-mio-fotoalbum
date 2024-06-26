// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il validatore
const validator = require('../middlewares/validator.js');

// Importo il bodyData
const bodyData = require("../validations/messages.js");

// Importo le funzioni dei messaggi
const {
    store,
    index,
    show,
    destroy
} = require("../controllers/messages.js");

// Rotta store
router.post('/', validator(bodyData), store);

// Rotta index
router.get('/', index);

// Rotta show
router.get('/:id', show);

// Rotta destroy
router.delete('/:id', destroy);

module.exports = router;