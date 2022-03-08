const { request, response } = require("express");
const HospitalDB = require('../models/hospital.model');


const getHospital = async (req = request, resp = response)=> {
    try {
        const hospitales = await HospitalDB.find().populate('usuario', 'nombre1 apellido1 email rol')
        resp.status(200).json({
            ok: true,
            msg: 'Get Hospitales',
            hospitales
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error revisar los logs'
        });
    }
};

const getHospitalPaginado = async(req = request, resp = response)=> {
    const desde = Number(req.query.desde) || 0;
  // console.log(desde);
  try {
    const [hospitales, totalHospitales] = await Promise.all([
      HospitalDB.find({},"nombre usuario img")
      .populate('usuario', 'email img')
        .skip(desde)
        .limit(5),
       HospitalDB.countDocuments(),
    ]);
    resp.json({
      ok: true,
      msg: "Get Hospitales Paginados",
      hospitales,
      totalHospitales,
      uid: req.uid,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ ok: false, msg: "Error inesperado revisar logs" });
  }
};


const postHospital = async(req = request, resp = response)=> { 
    // usuario que realiza la peticion uid
    const uid = req.uid;
    const hospital = new HospitalDB({ usuario: uid, ...req.body});
    // console.log(uid);
    try {
        const hospitaldb = await hospital.save();
        resp.status(200).json({
            ok: true,
            msg: 'Hospital creado correctamente',
            hospital: hospitaldb
        });     
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error revisar los logs'
        });
    }
};


const putHospital = async (req = request, resp = response)=> {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const hospitaldb = await HospitalDB.findById(id);
        if (!hospitaldb) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontro un hospital con es Id'
            });    
        }
        // hospital.nombre = req.body.nombre;
        const cambioHospital = {
            ...req.body,
            usuario:uid
        };
        const hospitalActualizado = await HospitalDB.findByIdAndUpdate(id, cambioHospital, {new:true}); 
        resp.status(200).json({
            ok: true,
            msg: 'Put Hospitales',
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error revisar los logs'
        });
    }
};

const deleteHospital = async (req = request, resp = response)=> {

    const id = req.params.id;
    try {
        const hospitaldb = await HospitalDB.findById(id);
        if (!hospitaldb) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontro un hospital con es Id'
            });    
        }
        const hospitalDelete = await HospitalDB.findByIdAndDelete(id);
        resp.status(200).json({
            ok: true,
            msg: 'Hospital Borrado Correctamente',
            hospitalDelete
        });
    } catch (error) {
        console.log(error);
    resp.status(500).json({
        ok: false,
        msg: 'Error revisar los logs'
    });
    }
    
};


module.exports = {
    getHospital,
    postHospital,
    putHospital,
    deleteHospital,
    getHospitalPaginado
}