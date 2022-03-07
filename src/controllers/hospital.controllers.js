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


const putHospital = (req = request, resp = response)=> {
    resp.status(200).json({
        ok: true,
        msg: 'Put Hospitales'
    });
};

const deleteHospital = (req = request, resp = response)=> {
    resp.status(200).json({
        ok: true,
        msg: 'Delete Hospitales'
    });
};


module.exports = {
    getHospital,
    postHospital,
    putHospital,
    deleteHospital
}