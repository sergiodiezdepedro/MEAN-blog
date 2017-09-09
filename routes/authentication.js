const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({
                success: false,
                message: 'Tienes que proporcionar un correo'
            });
        } else {
            if (!req.body.username) {
                res.json({
                    success: false,
                    message: 'Tienes que proporcionar un nombre de usuario'
                });
            } else {
                if (!req.body.password) {
                    res.json({
                        success: false,
                        message: 'Tienes que proporcionar una contraseña'
                    });
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) => {
                        if (err) {
                            res.json({
                                success: false,
                                message: `No se ha guardado el usuario. Error: ${err}`
                            });
                        } else {
                            res.json({
                                success: true,
                                message: `Usuario registrado correctamente`
                            });
                        }
                    });
                }
            }
        }
    });
    return router;
};