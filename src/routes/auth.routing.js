
/*
RUTA: /api/login
*/
const { Router } = require('express');
const {login, googleSingIn, renewToken} = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.middleware');
const { validarJWT } = require('../middleware/validar-jwt.middleware');

const router = Router();

router.post('/', [
    check('email', 'El correo es Obligatorio').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'El token de Google es Obligatorio').not().isEmpty(),
    validarCampos
], googleSingIn);

router.get('/renew', validarJWT , renewToken);



module.exports = router;

