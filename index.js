const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(userRoute)

app.listen(process.env.PORT, ()=>{
    console.log("Connected to Vibe Server successfully...")
})

mongoose.connect(process.env.MONGODB_URL,{dbName:"Vibe"}).then(()=>{
    console.log("Connected to Vibe Database successfully...")
}).catch((error)=>{
    console.log("Unable to connect with Vibe Database with error:- ", error)
})