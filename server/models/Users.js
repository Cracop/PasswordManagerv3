const {Schema, model} = require('mongoose')
const UserSchema = new Schema({
    usuario:{
        type:String,
        required: true
    },
    correo:{
        type:String,
        required: true,
        trim: true 
    },
    passwd:{
        type: String, 
        required: true,
    },
    salt:{
        type: String, 
        required: true,
    }
    },{
    versionKey: false
});
module.exports = model('user', UserSchema)