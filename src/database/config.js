const mongoose = require('mongoose');


const dbConnection = async () => {
    // mongodb+srv://admin:IJociwCTwb5hOXei@cluster0.kwqqs.mongodb.net/hospitalDB
    // local mongodb://localhost:27017/test
try {
    await mongoose.connect(process.env.DB_CDC, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });    
        console.log('On Run BDD \x1b[32m%s\x1b[0m', 'Online');
} catch (error) {
    console.log(error);
    throw new Error('Error en la conexión a la BDD');
}
}

module.exports = {
    dbConnection
}