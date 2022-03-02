const { request, response } = require("express");
const {generarJWT} = require('../helpers/jwt.helpers');
const bcryptjs = require("bcryptjs");
const UsuarioDB = require('../models/usuario.model');

const login = async (req =  request, res = response) => {
    const {email, password} = req.body;
    try {
        // verificar email
        const usuarioDb = await UsuarioDB.findOne({email});
        if (!usuarioDb) {
            return res.status(400).json({ 
                ok: false, 
                msg: 'Email o Clave no son correctos',
            });    
        };

        // verificar clave
        const validarPassword = bcryptjs.compareSync(password, usuarioDb.password);
        if (!validarPassword) {
            return res.status(400).json({ 
                ok: false, 
                msg: 'Clave o Email no son correctos',
            });    
        };
        //TODO: General el token
        const token = await generarJWT(usuarioDb.id, usuarioDb.nombre1, usuarioDb.nombre2, usuarioDb.apellido1, usuarioDb.apellido2, usuarioDb.email);
        res.status(200).json({ 
            ok: true, 
            msg: 'Login Correctamente Realizado',
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado revisar logs'});     
    }
}


module.exports = {
    login
}