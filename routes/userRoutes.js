const express = require("express");
const {UserModel} = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,gender} = req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            const user = new UserModel({name,email,password:hash,gender});
            await user.save();
            res.status(200).send({"message":"new user registered successfully"})
        });
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

// login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email,password});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){

                    const token = jwt.sign({authorId: user._id,author:user.name},"masai")
                    res.status(200).send({"message":"user Login successfully"})
                }else{
                    res.status(200).send({"message":"Wrong credentials"})
                }
            });
        }else{
            res.status(200).send({"message":"Wrong credentials"})
        }
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})


module.exports={
    userRouter,
}