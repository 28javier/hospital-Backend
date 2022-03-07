const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { request, response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo.helpers');
const UsuarioDB = require('../models/usuario.model');
const MedicoDB = require('../models/medico.model');
const HospitalDB = require('../models/hospital.model');



const cargarArchivo = async (req = request, resp = response) => {
  
    try {
        const nombre = await subirArchivo(req.files);
        // const nombre = await subirArchivo(req.files, undefined, 'Imgs');
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'Texto');
        resp.status(200).json({ok: true, msg:'Imagen Subida Correctamente', nombre});
    } catch (error) {
        resp.status(400).json({error});
    }
};


const actualizarImagenn = async(req = request, resp = response) => {
    const {id, coleccion} = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await UsuarioDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Usuario con ese ${id}`});
            }
            break;

        case 'medicos':
            modelo = await MedicoDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Medico con ese ${id}`});
            }
            break;

        case 'hospitales':
            modelo = await HospitalDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Hospital con ese ${id}`});
            }
        break;
    
        default:
            return resp.status(500).json({msg: 'Se me olvido validar esto'})
    };

    // limpiar imagenes previas
    if (modelo.img) {
        // borrar imagen del server
        const pathImagen = path.join(__dirname, '../upload', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        };
    };
        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();
        resp.status(200).json({
            ok: true,
            msg: 'Imagen Actualizada correctamente',
            modelo
        });

};

const actualizarImagenClaudanary = async(req = request, resp = response) => {
    const {id, coleccion} = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await UsuarioDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Usuario con ese ${id}`});
            }
            break;

        case 'medicos':
            modelo = await MedicoDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Medico con ese ${id}`});
            }
            break;

        case 'hospitales':
            modelo = await HospitalDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Hospital con ese ${id}`});
            }
        break;
    
        default:
            return resp.status(500).json({msg: 'Se me olvido validar esto'})
    };

    // limpiar imagenes previas de cloudinary
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        // console.log(public_id);
     cloudinary.uploader.destroy(public_id);
    };
    // console.log(req.files.imagen);
    const {tempFilePath} = req.files.imagen;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
        await modelo.save();
        resp.status(200).json({
            ok: true,
            msg: 'Imagen Actualizada correctamente',
            modelo
        });

};


const mostrarImagen = async(req = request, resp = response) => {
    const {id, coleccion} = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await UsuarioDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Usuario con ese ${id}`});
            }
            break;

        case 'medicos':
            modelo = await MedicoDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Medico con ese ${id}`});
            }
            break;

        case 'hospitales':
            modelo = await HospitalDB.findById(id);
            if (!modelo) {
                return resp.status(400).json({ok: false, msg: `No existe un Hospital con ese ${id}`});
            }
        break;
    
        default:
            return resp.status(500).json({msg: 'Se me olvido validar esto'})
    };
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../upload', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return resp.sendFile(pathImagen);
        }
    };
    const pathImg = path.join(__dirname, `../upload/no-img.jpg`);
        resp.sendFile(pathImg);
};

module.exports = {
    cargarArchivo,
    actualizarImagenn,
    actualizarImagenClaudanary,
    mostrarImagen
}