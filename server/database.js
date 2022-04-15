const mongoose = require('mongoose')
const connect = mongoose.connect;

//dotenv
const uri = process.env.BD_URI;

const startConnection = async () => {
    try {
        //Investigar variables de entorno por seguridad
        const db =  await connect(uri)
        console.log(db.connection.name)
    } catch(error){
       console.log(error)
    }
};

module.exports = startConnection;