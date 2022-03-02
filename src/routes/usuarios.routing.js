
/*
RUTA: /api/usuarios
*/
const { Router } = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos.middleware');
const {validarJWT} = require('../middleware/validar-jwt.middleware');
const {getUsuarios, createUsuario, updateUsuarios, deleteUsuarios} = require('../controllers/usuarios.controllers');

const router = Router();

router.get('/', [validarJWT], getUsuarios);

router.post('/', [
    check('nombre1', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre2', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido1', 'El apellido es obligatorio').not().isEmpty(),
    check('apellido2', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], createUsuario);

router.put('/:id', [
    validarJWT,
    check('nombre1', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre2', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido1', 'El apellido es obligatorio').not().isEmpty(),
    check('apellido2', 'El apellido es obligatorio').not().isEmpty(),
    check('rol', 'El role es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], updateUsuarios);

router.delete('/:id', [validarJWT], deleteUsuarios);

module.exports = router;

