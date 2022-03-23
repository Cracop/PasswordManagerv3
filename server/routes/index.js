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

module.exports = router