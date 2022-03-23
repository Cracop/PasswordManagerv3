const mongoose = require('mongoose')
const connect = mongoose.connect

const uri = "mongodb+srv://rabm:rabm161099@mevn-database.sr8st.mongodb.net/mevn-database?retryWrites=true&w=majority";

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