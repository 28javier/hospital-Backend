const { request, response } = require("express");
const {generarJWT} = require('../helpers/jwt.helpers');
const bcryptjs = require("bcryptjs");
const UsuarioDB = require('../models/usuario.model');
const { googleVerify } = require("../helpers/google-verify.helpers");

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
};

const googleSingIn = async (req =  request, res = response) => {
    const {token} = req.body;
    try {
        const {name, email, picture} = await googleVerify(token);
        // verificar si existe un email
        const usuarioDb = await UsuarioDB.findOne({email});
        let usuario;
        if (!usuarioDb) {
        //     // si no existe el usuario
            usuario = new UsuarioDB({
                nombre1: name,
                nombre2: name,
                apellido1: name,
                apellido2: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
        //     // existe usuario
            usuario = usuarioDb;
            usuario.google = true;
        }

        // // guardar en base de datos
        await usuario.save();
        // // generar jwt
        const token1 = await generarJWT(usuarioDb.id, usuarioDb.nombre1, usuarioDb.nombre2, usuarioDb.apellido1, usuarioDb.apellido2, usuarioDb.email);
        res.status(200).json({
            ok: true,
            msg: 'Google Sing-In',
            name, email, picture,
            token1
        });    
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es Correcto',
            error
        });
    }

    
}


module.exports = {
    login,
    googleSingIn
}