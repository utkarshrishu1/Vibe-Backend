const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('../middlewares/bcrypt')
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Enter a valid E-mail!");
        }
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.pre("save", bcrypt.encryptPassword)
const User = mongoose.model("users",userSchema)
module.exports = User