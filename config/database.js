// Función para encriptar
const crypto = require('crypto').randomBytes(256).toString('hex'); 

// Configuración de la base de datos que se exporta para su uso en otras partes de la aplicación
module.exports = {
    uri: 'mongodb://localhost:27017/blog',
    secret: crypto,
    db: 'blog'
};