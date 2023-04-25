const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/UserModel");
require("dotenv").config();
const saltRound = 4;


const userRoutes = express.Router();


userRoutes.post("/signup", async(req,res) => {
    const { email, password, name, mobileNumber } = req.body;

    const userEmail = await UserModel.findOne({email});
    const userNumber = await UserModel.findOne({mobileNumber});

    if(userEmail && userNumber){
        res.status(409).send({"message":"This Email & Mobile Number are already registered"});
    }

    else if(userEmail){
        res.status(409).send({"message":"This Email is already registered"});
    }

    else if(userNumber){
        res.status(409).send({"message":"This Mobile Number is already registered"});
    }

    else if(!password || !mobileNumber || !email || !name){
        res.status(400).send({message:"All required fields must be provided"})
    }

    else{

        try {
            bcrypt.hash(password,saltRound, async(err,myPassword) => {
                const user = new UserModel({name,email, password:myPassword,userNumber});
                await user.save();
                console.log("Signup Successfully");
                res.status(201).send({"message":"Signup Successfully"})
            })
        } 
        
        catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    }
})



userRoutes.post("/login", async(req,res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({email});

    if(!user){
        return res.status(404).send({ "message": "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if(match){
        const userInfo = {...user.toObject(), password: undefined};
        const token = jwt.sign({ "user": userInfo }, process.env.secret_key, { expiresIn: "7d"});
        res.status(201).send({token, "user": userInfo, "message": "Login successfully"});
    }

    else {
        res.status(403).send({ message: "Incorrect Password" });
      }

    } 
        
     catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

})


module.exports = { userRoutes };