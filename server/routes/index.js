const express = require('express')
const router = express.Router()
const User = require('../models/Users');
const Sec = require('../Security.js');

//NOTA, LAS VARIABLES SE DEBEN LLAMAR IGUAL QUE LOS CAMPOS EN EL SCHEMA

// all routes

router.get("/users", async (req,res)=> { //Select *
    const users = await User.find();
    res.send(users);
});

//Create user 
//https://www.google.com/search?client=firefox-b-d&q=vue+send+data+to+post+reques#kpvalbx=_pJo7YuyYJ4LdqtsPtZOU4AQ16
// Debo quitar la info del UR
router.post("/users/:correo", async (req,res)=> { //add
    const {usuario, correo, passwd} = req.body;
    const user = new User({usuario, correo, passwd})
    try {
        const oldUser = await User.findOne({'correo': req.params.correo})
        if (oldUser) return res.status(400).send()

        res.json({requestBody: req.body}) 
        //console.log(task)
    await user.save();
    }catch (err) {
        return res.status(500).send(error);
    }
    //res.json(user)
});

router.post("/user/signup", async (req,res)=> { //add
    
    try {
        let {usuario, correo, pass} = req.body;
        const oldUser = await User.findOne({'correo': correo})
        if (oldUser) return res.status(400).send()

        const {hash, salt} = Sec.hashWithSalt(pass)
        const passwd = hash;
        const user = new User({usuario, correo, passwd, salt})
        console.log(hash)
        console.log(user)
        res.json({user}) 
        
        await user.save();
    }catch (err) {
        console.log(err)
        return res.status(500).send();
    }
    //res.json(user)
});

router.post("/user/login", async (req,res)=> {
    try{
        const {correo, passwd} = req.body;
        //console.log(req.body)
        let user = await User.findOne({ 'correo': correo })

        //si no hay correo guardado
        if (!user) return res.status(404).send("No hay tal usuario")

        // Si las contraseñas no coinciden
        if(user.passwd !== Sec.hashWithSalt(passwd,user.salt).hashedPasswd) 
            return res.status(500).send("Credenciales incorrectas");

        console.log(user)
        res.send({"id": user._id.toString(),"usuario": user.usuario});

    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
});

//Get Specific user AKA Login
// Debe ser un post
router.get("/user/:correo/:password", async (req,res)=> { //Select * where
    try{
        const user = await User.findOne({ 'correo': req.params.correo, "passwd":req.params.password })
        //si el id es valido, pero no hay tarea como esa
        if (!user) return res.status(404).send("No hay tal usuario")
        //console.log(user._id.toString())//Así guardo el valor del id
        res.send(user);
    }catch(error){//Si el id no es valido
        console.log(error)
        return res.status(500).send(error);
    }
});

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

module.exports = router