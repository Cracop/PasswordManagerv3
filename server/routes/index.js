const express = require('express')
const router = express.Router()
const User = require('../models/Users');
const Sec = require('../Security.js');


// all routes

router.get("/users", async (req,res)=> { //Select *
    const users = await User.find();
    res.send(users);
});

//Create user 
//https://www.google.com/search?client=firefox-b-d&q=vue+send+data+to+post+reques#kpvalbx=_pJo7YuyYJ4LdqtsPtZOU4AQ16
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

//Get Specific user AKA Login
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