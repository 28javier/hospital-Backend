const path = require('path');
const fs = require('fs');
const { request, response } = require("express");
const { v4 } = require("uuid");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen.helpers");
const res = require('express/lib/response');

const fileUpload = (req = request, resp = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    // validar tipo
    const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposPermitidos.includes(tipo)) {
        return resp.status(400).json({ok: false, msg: 'No es medicos, usuarios, hospitales (tipo)'});  
    };
    // validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({ok: false, msg:'No se selecciono ningun archivo'});
    };
    // procesar la imagen...
    const file = req.files.imagen;
    // console.log(file);
    const nombreCortado = file.name.split('.'); // cortar nombre de iamagen por el . final
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // Validar extension
    const extesionesValidad = ['png', 'jpeg', 'jpg', 'git'];
    if (!extesionesValidad.includes(extensionArchivo)) {
        return resp.status(400).json({ok: false, msg: 'Solo se permiten imagen con extesiones [png, jpg, jpeg, git]'});  
    };
    // Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    // Path para guardar la imagen
    const pathI = `src/upload/${tipo}/${nombreArchivo}`;
    // Mover la Imagen
  file.mv( pathI, (err) => {
    if (err) {
        console.log(err);
        return resp.status(500).json({ok: false, msg: 'Error al mover la Imagen'});
    }
    resp.status(200).json({ ok: true, msg: 'Archivo subido correctamente', nombreArchivo});     
    });
    // Actualizar la base de datos
     actualizarImagen(tipo, id, nombreArchivo);
};

const retornaImagen = (req = request, resp = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname, `../upload/${tipo}/${foto}`);

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        resp.sendFile(pathImg);
    } else {
    const pathImg = path.join(__dirname, `../upload/no-img.jpg`);
    resp.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}