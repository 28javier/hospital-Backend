const { request, response } = require("express");
const MedicoDB = require('../models/medico.model');

const getMedico = async (req = request, resp = response)=> {
    try {
        const medicos = await MedicoDB.find()
                                .populate('usuario', 'nombre1 apellido1 email rol')
                                .populate('hospital', 'nombre')
        resp.status(200).json({
            ok: true,
            msg: 'Get Medicos',
            medicos
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error revisar los logs'
        });
    }
};


const postMedico = async(req = request, resp = response)=> {
    // usuario que realiza la peticion uid
    const uid = req.uid;
    const medico = new MedicoDB({ usuario: uid, ...req.body});
    // console.log(uid);
    try {
        const medicodb = await medico.save();
        resp.status(200).json({
            ok: true,
            msg: 'Medico creado correctamente',
            medico: medicodb
        });     
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error revisar los logs'
        });
    }
};


const putMedico = (req = request, resp = response)=> {
    resp.status(200).json({
        ok: true,
        msg: 'Put Medico'
    });
};

const deleteMedico = (req = request, resp = response)=> {
    resp.status(200).json({
        ok: true,
        msg: 'Delete Medico'
    });
};


module.exports = {
    getMedico,
    postMedico,
    putMedico,
    deleteMedico
}