// Importo express
const express = require("express");

// Istanza di express.Router()
const router = express.Router();

// Importo il validatore
const validator = require('../middlewares/validator.js');

// Importo il validatore dello slug
const validationSlug = require("../validations/validationSlug.js");

// Importo il bodyData
const bodyData = require("../validations/photos.js");

// Autenticazione Token
const authenticateToken = require('../middlewares/authToken.js');

// Autenticazione Admin
const adminPermission = require("../middlewares/authAdmin.js");

// Importo il controller delle foto
const {
    store,
    index,
    show,
    update,
    destroy
} = require("../controllers/photos.js");

// ? Rotte pubbliche
// Rotta index
router.get('/', index);

// ? Validatore dello slug
router.use('/:slug', validator(validationSlug));

// Rotta show
router.get('/:slug', show);

// ? Rotte Protette
router.use(authenticateToken);

// ! Rotte Admin
router.use(adminPermission);

// Rotta store
router.post('/', validator(bodyData), store);

// Rotta update
router.put('/:slug', validator(bodyData), update);

//Rotta destroy
router.delete('/:slug', destroy);

module.exports = router;
