const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors)

app.listen(process.env.PORT, ()=>{
    console.log("Connected to Vibe Server successfully...")
})
mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("Connected to Vibe Database successfully...")
}).catch((error)=>{
    console.log("Unable to connect with Vibe Database with error:- ", error)
})