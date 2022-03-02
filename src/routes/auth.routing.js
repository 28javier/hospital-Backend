
/*
RUTA: /api/login
*/
const { Router } = require('express');
const {login} = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.middleware');

const router = Router();

router.post('/', [
    check('email', 'El correo es Obligatorio').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarCampos
], login);


module.exports = router;

