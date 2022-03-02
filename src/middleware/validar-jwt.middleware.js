const { request, response } = require("express");
const  jwt  = require("jsonwebtoken");

const validarJWT = (req = request, res = response, next) => {

    // leer el token
    const token = req.header('x-token');
    // console.log(token); 

    // si no existe el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg:'No hay token en la peticion'
        });
    };

    // verificar el token
    try {
        const {uid, nombre1, nombre2, apellido1, apellido2, email} = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(uid);
        req.uid = uid;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg:'Token no valido'
        });
    }
    next();
}


module.exports = {
    validarJWT
}