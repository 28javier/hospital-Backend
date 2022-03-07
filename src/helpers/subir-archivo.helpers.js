const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extesionesValidas = ['png', 'jpeg', 'jpg', 'git'], carpeta ='') => {
    return new Promise((resolve, reject) => {
        const {imagen} = files;
        const nombreCortado = imagen.name.split('.'); // cortar nombre de iamagen por el . final
        // console.log(nombreCortado);
        const extension = nombreCortado[nombreCortado.length - 1];
       // Validar extension
        // const extesionesValidas = ['png', 'jpeg', 'jpg', 'git'];
      if (!extesionesValidas.includes(extension)) {
          reject(`La extension ${extension} no es permitida. Solo se permiten extesiones - ${extesionesValidas}`);
      };
       const nombreTemporal = uuidv4() + '.' + extension;
       const uploadPath = path.join(__dirname,'../upload/', carpeta, nombreTemporal);
        imagen.mv(uploadPath, (err) => {
         if (err) {
           reject(err)
        }
        resolve(nombreTemporal);
        // resolve(uploadPath);
     });
    });    
};

module.exports = {
    subirArchivo
}