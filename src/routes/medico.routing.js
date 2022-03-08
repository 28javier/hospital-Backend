
/*
RUTA: /api/medicos
*/
const { Router } = require('express');
const {getMedico, postMedico, putMedico, getMedicoPaginado, deleteMedico} = require('../controllers/medico.controllers');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos.middleware');
const { validarJWT } = require('../middleware/validar-jwt.middleware');

const router = Router();

router.get('/', [validarJWT], getMedico);
router.get('/paginado', [validarJWT], getMedicoPaginado);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser valido').isMongoId(),
    validarCampos
], postMedico);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser valido').isMongoId(),
    validarCampos
], putMedico);

router.delete('/:id', [validarJWT], deleteMedico);


module.exports = router;

