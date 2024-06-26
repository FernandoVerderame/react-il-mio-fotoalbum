const bodyData = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "L'email è obbligatoria!",
            bail: true
        },
        isEmail: {
            errorMessage: "Email non valida!",
            bail: true
        },
        trim: true
    },
    content: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Il content è obbligatorio!',
            bail: true
        },
        isString: {
            errorMessage: 'Il content non può contenere solo numeri!',
            bail: true
        },
        isLength: {
            errorMessage: 'Il content deve contenere almeno 20 caratteri!',
            options: { min: 20 }
        },
        trim: true
    }
}

module.exports = bodyData;