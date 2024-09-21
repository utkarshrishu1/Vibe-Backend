const express = require('express')
const router = express.Router()
const validator = require('validator');
const User = require('../models/user');
const bcrypt = require('../middlewares/bcrypt');

router.post("/signup", async(req, res)=>{
    try{
        const userData = req.body;
        if(!userData || !userData.name || !userData.email || !userData.password)
        {
            res.status(400).send({"error":"Enter all the details!"})
        }
        else if(!validator.isAlpha(userData.name.replace(/\s+/g, '')))
        {

            res.status(400).send({"error": "Name should only contain Alphabets!"});
        }
        else if(!validator.isEmail(userData.email))
        {
            res.status(400).send({"error": "Email is not Valid!"})
        }
        else if(!validator.isStrongPassword(userData.password, {minLength:8, minNumbers:1, minLowercase:1, minSymbols:1, minUppercase:1}))
        {
            res.status(400).send({"error": "Password must contain atleast 8 letters with 1 uppercase, 1 lowercase, 1 number, 1 symbol"})
        }
        else if(await User.findOne({email:userData.email}))
        {
            res.status(409).send({"error": "Email already exists!"})
        }
        else
        {
            const user = new User({email:userData.email,
                name: userData.name,
                password: userData.password
            });
            await user.save();
            res.status(200).send(userData)
        }
    }catch(error){
        res.status(500).send({"error": error})
    }
})
router.post("/login", async(req, res)=>{
    try{
        const userData = req.body;
        if(!userData || !userData.email || !userData.password)
        {
            res.status(400).send({"error": "Enter the user details!"})
            return;
        }
        const user = await User.findOne({"email": userData.email});
        if(!user)
        {
            res.status(404).send({"error": "Enter a valid Email"})
        }
        const validPassword = await bcrypt.validatePassword(userData.password, user.password);
        if(!validPassword)
        {
            res.status(401).send({"error": "Invalid Email/Password!"})
        }
        else
        {
            res.status(200).send("Logged In Successfully!");
        }
    }catch(error)
    {
        res.status(500).send({"error": error});
    }
})

module.exports = router