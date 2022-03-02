const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const UsuarioDB = require('../models/usuario.model');
const {generarJWT} = require('../helpers/jwt.helpers');

 
// getUsuarios
const getUsuarios = async (req = request, res = response) => {

    try {
        const usuarios = await UsuarioDB.find({}, 'nombre1 nombre2 apellido1 apellido2 email rol img google')
        res.json({ 
            ok: true, 
            msg: 'Get Usuarios',
            usuarios,
            uid: req.uid
         });

    } catch (error) {
           console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado revisar logs'});
    }
   
};

// createUsuario
const createUsuario = async (req = request, res = response) => {
    // console.log(req.body);
    const {nombre1, nombre2, apellido1, apellido2, email, password} = req.body;

    // validar campos desde el middleware

    try {
        // verificar correo
        const existeEmail = await UsuarioDB.findOne({email: email});
        if (existeEmail) {
            return res.status(400).json({ok: false, msg: 'El correo ya esta registrado intenta con otro.'})
        };

        const usuario = new UsuarioDB(req.body);

        // encriptar password
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync(password, salt);

        // guardar usuario en la bdd
        await  usuario.save()

        //TODO: General el token
        const token = await generarJWT(usuario.id, usuario.nombre1, usuario.nombre2, usuario.apellido1, usuario.apellido2, usuario.email);
        res.json({ ok: true, msg: 'Usuario Creado', usuario, token});    
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado revisar logs'});
    };
};

// updateUsuarios

const updateUsuarios = async(req=request, res=response) => {
    //TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;
    try {
        const usuarioDB = await UsuarioDB.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({ 
                ok: false, 
                msg: 'No existe un usuario en la BDD con ese Id',
             }); 
        };

        // Actualizaciones del usuario
        // verificar si el correo existe 
        const {password, google, email, ...campos} = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await UsuarioDB.findOne({email: email});
            if (existeEmail) {
                return res.status(400).json({ok: false, msg: 'El correo ya esta registrado intenta con otro.'})
            };  
        };
        campos.email = email;
        const usuarioActualizado = await UsuarioDB.findByIdAndUpdate(uid, campos, { new: true });
        res.json({ 
            ok: true, 
            msg: 'Update Usuario',
            uid,
            usuario: usuarioActualizado
         });

    } catch (error) {
           console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado revisar logs'});
    }
};

//deleteUsuarios
const deleteUsuarios = async(req=request, res = response) =>{
    const uid = req.params.id;
    try {
        const usuarioDB = await UsuarioDB.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({ 
                ok: false, 
                msg: 'No existe un usuario en la BDD con ese Id',
             }); 
        };

        await UsuarioDB.findByIdAndDelete(uid);
        res.json({ 
            ok: true, 
            msg: 'Delete Usuario',
            uid,
            // usuario: usuarioActualizado
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado revisar logs'});     
    }
}

module.exports = {
    getUsuarios,
    createUsuario,
    updateUsuarios,
    deleteUsuarios
}