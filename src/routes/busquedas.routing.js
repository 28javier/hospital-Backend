/*
RUTA: /api/todo/:busqueda
*/
const { Router } = require("express");
const { validarJWT } = require("../middleware/validar-jwt.middleware");
const { busquedadTodo, getColeccionDocumento } = require("../controllers/busqueda.controllers");

const router = Router();

router.get("/:busqueda", [validarJWT], busquedadTodo);
router.get("/coleccion/:tabla/:busqueda", [validarJWT], getColeccionDocumento);

module.exports = router;
