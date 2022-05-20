const express = require('express')
const router = express.Router()
const User = require('../models/Users');
const Account = require('../models/Accounts');
const Sec = require('../Security.js');

//NOTA, LAS VARIABLES SE DEBEN LLAMAR IGUAL QUE LOS CAMPOS EN EL SCHEMA

// all routes

router.get("/users", async (req,res)=> { //Select *
    const users = await User.find();
    return res.send(users);
});

//Create user 
//https://www.google.com/search?client=firefox-b-d&q=vue+send+data+to+post+reques#kpvalbx=_pJo7YuyYJ4LdqtsPtZOU4AQ16

router.post("/user/signup", async (req,res)=> { //add
    
    try {
        let {usuario, correo, passwd} = req.body;
        console.log(passwd)
        const oldUser = await User.findOne({'correo': correo})
        if (oldUser) return res.status(400).send()
        const salt = Sec.saltear();
        passwd =  Sec.hashear(passwd+salt)
        const user = new User({usuario, correo, passwd, salt})
        res.json({user}) 
        // console.log(user)
        const result = await user.save();
        return res.status(200).send(result);
    }catch (err) {
        console.log(err)
        return res.status(500).send();
    }
    //res.json(user)
});

router.post("/user/login", async (req,res)=> {
    try{
        const {correo, passwd} = req.body;
        console.log(req.body)
        let user = await User.findOne({ 'correo': correo })
        
        //si no hay correo guardado
        if (!user) return res.status(404).send("No hay tal usuario")

        // Si las contraseñas no coinciden
        console.log("Hash guardado: "+user.passwd)
        console.log("Hash recibido: "+passwd)
        console.log("Sal: "+user.salt)
        console.log("Hash salteado: " + Sec.hashear(passwd+user.salt))
        if(user.passwd !== Sec.hashear(passwd+user.salt)) 
            return res.status(401).send("Credenciales incorrectas");

        console.log(user)
        return res.send({"_id": user._id.toString(),"usuario": user.usuario});

    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }

});

//Get Specific user AKA Login

router.delete("/user/:id", async (req,res)=> { //Delete from where
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        //si el id es valido, pero no hay tarea como esa
        if (!user) return res.status(404).json({message: "task not found"})
        return res.json(user)

    }catch(error){//Si el id no es valido
        //console.log(error)
        return res.status(500).send(error);
    }
    //res.send("deleting a task!");
});

// Update a user
router.patch('/user/:id', async (req, res) => {
    const user = await User.updateOne({_id: req.params.id}, {$set: req.body});
    res.json(user);
});

//Test API
router.get("/test", async (req,res)=> { //Select *
    const prueba = Sec.hashear("Hello")
    res.send(prueba);
});

//Add account
router.post("/account/add", async (req, res) => {
    try {//FALTA LA PARTE SEGURA
        const {alias, idUsuario, URL, correo, passwd, username} = req.body;
        const account = new Account({alias, idUsuario, URL, correo, passwd, username})
        // res.json({account}) 
        console.log(req.body)
        const result = await account.save();
        return res.status(200).send(result);
        
    }catch (err) {
        console.log(err)
        return res.status(500).send();
    }
});

//get accounts
router.post("/accounts/get", async (req, res) => {
    const {idUsuario} = req.body;
    console.log(idUsuario)
    const accounts = await Account.find({'idUsuario': idUsuario});
    console.log(accounts)
    return res.send(accounts);
});

// Update an account
router.patch('/account/update', async (req, res) => {
    
});

// delete an account
router.patch('/account/delete', async (req, res) => {
    
});


module.exports = router