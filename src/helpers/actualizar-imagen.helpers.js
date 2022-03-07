const fs = require('fs');
const UsuarioDB = require('../models/usuario.model');
const MedicoDB = require('../models/medico.model');
const HospitalDB = require('../models/hospital.model');





const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    };
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {
    // console.log('vamos bien');

    let pathViejo = '';
    switch (tipo) {
        case 'usuarios':
            const usuario = await UsuarioDB.findById(id);
            if (!usuario) {
                console.log('No se encontro un usuario con ese Id');
                return false;
            }
             pathViejo = `src/upload/usuarios/${usuario.img}`;
            // if (fs.existsSync(pathViejo)) {
            //     // borrar la imagen anterior
            //     fs.unlinkSync(pathViejo);
            // };
            borrarImagen(pathViejo)
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;

        case 'medicos':
            const medico = await MedicoDB.findById(id);
            if (!medico) {
                console.log('No se encontro un medico con ese Id');
                return false;
            }
             pathViejo = `src/upload/medicos/${medico.img}`;
            borrarImagen(pathViejo)
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            const hospital = await HospitalDB.findById(id);
            if (!hospital) {
                console.log('No se encontro un hospital con ese Id');
                return false;
            }
             pathViejo = `src/upload/hospitales/${hospital.img}`;
            borrarImagen(pathViejo)
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;
    
        default:
            break;
    }
};


module.exports = {actualizarImagen}