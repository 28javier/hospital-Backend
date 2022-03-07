
/*
RUTA: /api/hospitales
*/
const { Router } = require('express');
const {getHospital, postHospital, putHospital, deleteHospital} = require('../controllers/hospital.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.middleware');
const { validarJWT } = require('../middleware/validar-jwt.middleware');

const router = Router();

router.get('/', [validarJWT], getHospital);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
    validarCampos
], postHospital);

router.put('/:id', [validarJWT], putHospital);

router.delete('/:id', [validarJWT], deleteHospital);


module.exports = router;

