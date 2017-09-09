const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database'); //Configuración de mongoose
const path = require('path'); // Paquete de Node.js para rutas de archivos
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');

// Conexión con la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, {
    useMongoClient: true
}, (err) => {
    if (err) {
        console.log(`No hay conexión con la base de datos: ${err}`);
    } else {
        console.log(`Conexión con la base de datos: ${config.db}`);
    }
});

// Directorio estático para front-end

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// Parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));

app.use('/authentication', authentication);

// Conectar el servidor a la página index.html de Angular
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

// Servidor estático que sirve en el puerto 8080
app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});