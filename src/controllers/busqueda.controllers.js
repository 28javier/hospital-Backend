const { request, response } = require("express");
const UsuarioDB = require('../models/usuario.model');
const HospitalDB = require('../models/hospital.model');
const MedicoDB = require('../models/medico.model');

const busquedadTodo = async (req = request, resp = response) => {
  const busqueda = req.params.busqueda;
  //   console.log(busqueda);
  const regex = new RegExp(busqueda, 'i');

  // const usuarios = await UsuarioDB.find({apellido1: regex});
  // const hospitales = await HospitalDB.find({nombre: regex});
  // const medicos = await MedicoDB.find({nombre: regex});
  const [usuarios, hospitales, medicos] = await Promise.all([
     UsuarioDB.find({apellido1: regex}),
     HospitalDB.find({nombre: regex}),
     MedicoDB.find({nombre: regex})
  ]);
  resp.status(200).json({
    ok: true,
    msg: "Busquedad de Todo",
    usuarios,
    hospitales,
    medicos
  });
};


const getColeccionDocumento = async (req = request, resp = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, 'i');
  let data = [];
  switch (tabla) {
    case 'medicos':
       data = await MedicoDB.find({nombre: regex})
                            .populate('usuario', 'nombre1 nombre2 apellido1 apellido2 email')
                            .populate('hospital', 'nombre');
    break;

    case 'usuarios':
       data = await UsuarioDB.find({apellido1: regex});
    break;

    case 'hospitales':
       data = await HospitalDB.find({nombre: regex})
                              .populate('usuario', 'nombre1 nombre2 apellido1 apellido2 email');
                              
    break;
  
    default:
     return resp.status(400).json({
        ok: false,
        msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
      });
  }
  resp.status(200).json({ok: true, resultados: data});
};

module.exports = {
  busquedadTodo,
  getColeccionDocumento
};
