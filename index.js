const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, {useMongoClient: true}, (err) => {
    if (err) {
        console.log(`No hay conexión con la base de datos: ${err}`);
    } else {
        console.log(`Conexión con la base de datos: ${config.db}`);
    }
});

app.use(express.static(__dirname + '/client/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});