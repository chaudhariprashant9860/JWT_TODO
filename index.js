const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
require.apply('dotenv').config();
const userRoute = require('./app/api/routes/user')

const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
app.set('secretKey','hdjsakfhdjsk')





app.use(logger('dev'))
app.use(bodyParser.json())

app.use('/user',userRoute)

app.get('/',(req,res) =>{

    res.json({
        "App" : "App JWT",
        "message":"Successfully running the app"
    })
})

const mongoURI =process.env.mongoURI

mongoose.connect(mongoURI)
.then(()=>{
    console.log("Databse connected");
})
.catch((err)=>{
    console.log(err);
})

app.listen(80,()=>{
    console.log("Successfully running on port number");
})