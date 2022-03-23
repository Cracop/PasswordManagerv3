const express = require('express')
const router = express.Router()
const User = require('../models/Users');

// all routes

router.get("/users", async (req,res)=> { //Select *
    const users = await User.find();
    res.send(users);
});

router.post("/users", async (req,res)=> { //add
    const {usuario, correo, passwd} = req.body;
    const user = new User({usuario, correo, passwd})
    //console.log(task)
    await user.save();
    res.json(user)
});

router.get("/users/:id", async (req,res)=> { //Select * where
    try{
        const user = await User.findById(req.params.id)
        //si el id es valido, pero no hay tarea como esa
        if (!user) return res.status(404).json({message: "user not found"})
        
        res.send(user);
    }catch(error){//Si el id no es valido
        //console.log(error)
        return res.status(500).send(error);
    }
});

router.delete("/users/:id", async (req,res)=> { //Delete from where
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

module.exports = router