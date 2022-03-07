const jwt = require('jsonwebtoken');

const generarJWT = (uid, nombre1, nombre2, apellido1, apellido2, email) => {
    return new Promise((resolve, reject) => {
        const payload ={
            uid,
            nombre1,
            nombre2,
            apellido1,
            apellido2,
            email
        }; 
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '5h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            } else {
                resolve(token);
            }
        });

    });   
}

module.exports = {
    generarJWT
};