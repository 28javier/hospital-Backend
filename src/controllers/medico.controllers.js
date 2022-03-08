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

const getMedicoPaginado = async (req, resp) => {
    const desde = Number(req.query.desde) || 0;
    // console.log(desde);
    try {
      const [medicos, totalMedicos] = await Promise.all([
        MedicoDB.find({},"nombre usuario hospital img")
        .populate('usuario', 'email img')
        .populate('hospital', 'nombre img')
          .skip(desde)
          .limit(5),
         MedicoDB.countDocuments(),
      ]);
      resp.json({
        ok: true,
        msg: "Get Medicos Paginados",
        medicos,
        totalMedicos,
        uid: req.uid,
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({ ok: false, msg: "Error inesperado revisar logs" });
    }
}

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


const putMedico = async (req = request, resp = response)=> {
    
    const id = req.params.id;
    const uid = req.uid;

    try {
        const medicodb = await MedicoDB.findById(id);
        if (!medicodb) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontro un Medico con es Id'
            });    
        }
        // hospital.nombre = req.body.nombre;
        const cambioMedico = {
            ...req.body,
            usuario:uid
        };
        const medicoActualizado = await MedicoDB.findByIdAndUpdate(id, cambioMedico, {new:true}); 
        resp.status(200).json({
            ok: true,
            msg: 'Medico Actualizado Correctamente',
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error revisar los logs'
        });
    }
};

const deleteMedico = async(req = request, resp = response)=> {
    const id = req.params.id;
    try {
        const medicodb = await MedicoDB.findById(id);
        if (!medicodb) {
            return resp.status(404).json({
                ok: false,
                msg: 'No se encontro un medico con es Id'
            });    
        }
        const medicoDelete = await MedicoDB.findByIdAndDelete(id);
        resp.status(200).json({
            ok: true,
            msg: 'Medico Borrado Correctamente',
            medicoDelete
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
    getMedico,
    getMedicoPaginado,
    postMedico,
    putMedico,
    deleteMedico
}