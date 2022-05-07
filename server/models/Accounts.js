// {
//     _id: "au3721233",
//     alias: "lala", //Requerido
//     idUsuario: "akskas123847547854", //Requerido
//     URL: "lala.com",
//     correo: "lala@gmail.com",
//     passwd: "lala",
//     username: "lala",
//     salt: "soyUnaTeteraPequeñita",
//   },

const {Schema, model} = require('mongoose')
const AccountSchema = new Schema({
    alias:{
        type:String,
        required: true
    },
    idUsuario:{
        type:String,
        required: true,
        trim: true 
    },
    URL:{
        type: String, 
        required: false,
    },
    correo:{
        type: String, 
        required: false,
    },
    passwd:{
        type: String, 
        required: false,
    },
    username:{
        type: String, 
        required: false,
    },
    salt:{
        type: String, 
        required: true,
    },
    },{
    versionKey: false
});
module.exports = model('account', AccountSchema)