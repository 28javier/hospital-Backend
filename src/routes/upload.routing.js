/*
RUTA: /api/upload/medicos
RUTA: /api/upload/usuarios
RUTA: /api/upload/hospitales
*/
const { Router } = require("express");
const expressFileUpload = require('express-fileupload');
const {validarJWT} = require('../middleware/validar-jwt.middleware');
const {fileUpload, retornaImagen} = require('../controllers/upload.controller')



const router = Router();
router.use(expressFileUpload());

router.put("/:tipo/:id", [validarJWT], fileUpload);
router.get("/:tipo/:foto", retornaImagen);

module.exports = router;
