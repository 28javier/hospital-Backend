/*
RUTA: /api/upload/medicos
RUTA: /api/upload/usuarios
RUTA: /api/upload/hospitales
*/
const { Router } = require("express");

const {fileUpload, retornaImagen,cargarArchivo, actualizarImagenn, actualizarImagenClaudanary, mostrarImagen} = require('../controllers/upload.controller');
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validar-campos.middleware");
const { validaraArchivoSubir } = require("../middleware/validar-archivoImagen.midleware");
const { coleccionesPermitidas } = require("../helpers/db-validator.helpers");



const router = Router();


router.post("/", validaraArchivoSubir, cargarArchivo);

router.put("/:coleccion/:id", [
    validaraArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c , ['usuarios', 'medicos', 'hospitales'])),
    validarCampos
], actualizarImagenClaudanary);
// ], actualizarImagenn);

router.get("/:coleccion/:id", [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c , ['usuarios', 'medicos', 'hospitales'])),
    validarCampos
], mostrarImagen);


// router.put("/:tipo/:id", [validarJWT], fileUpload);
// router.get("/:tipo/:foto", retornaImagen);

module.exports = router;
