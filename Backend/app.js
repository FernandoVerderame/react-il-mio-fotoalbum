// Importo express e dotenv
const express = require('express');
const dotenv = require("dotenv");

// Importo il ruote delle foto
const photosRouter = require("./routers/photos.js");

// Inizializzo express
const app = express();

// Importo Cors
const cors = require("cors");

app.use(cors());

// Definisco le variabili port e host
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

dotenv.config();

// application/json
app.use(express.json());

// Router delle foto
app.use('/photos', photosRouter);

// Avvio il server
app.listen(port, host, () => {
    console.log(`Server avviato su http://${host}:${port}`);
});