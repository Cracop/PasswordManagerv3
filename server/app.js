//Para ver si estoy en el ambiente de desarrollo o produccion
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();//Solo en el app
}
puerto = process.env.PORT || 3000
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const Routes = require("./routes")
const cors = require("cors")
const morgan = require("morgan")
const startConnection = require("./database")

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(cors());
app.use(morgan("dev"))
//Cualquier peticion que haga al servidor me lo muestra por consola
app.use(express.json())

// routes
app.use("/api", Routes);
startConnection();
//start server
app.listen(puerto, ()=>{
    console.log("listening at port: "+puerto)
}) 