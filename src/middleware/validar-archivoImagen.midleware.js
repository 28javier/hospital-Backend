const { request, response } = require("express");

const validaraArchivoSubir = (req = request, resp = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
       return resp.status(400).json({ok: false, msg:'No se selecciono ningun archivo - imagen'});
      };
      next();
};


module.exports = {
    validaraArchivoSubir
}