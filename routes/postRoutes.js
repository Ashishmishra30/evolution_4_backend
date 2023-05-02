const express = require('express');
const { PostModel } = require('../models/post');
const { auth } = require('../middlewares/authMiddlewares');

const postRouter = express.Router();

postRouter.post("/posts", auth, async (req, res) => {
    try {
        const { title, body, device } = req.body;
        const post = new PostModel({ title, body, device, authorId: req.user._id, author: req.user.name });
        await post.save();
        res.status(200).send({"message":"new post added successfully"})
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

// get Post

postRouter.get("/posts", auth,async(req,res)=>{
    try {
        const post = req.query;
        const posts = await PostModel.findById({authodId:req.user._id,...post})
        res.status(200).send(posts)
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

// update Post

postRouter.patch("/post/:id", auth,async(req,res)=>{
    try {
        const post = await PostModel.findOne({_id: req.params.id,authorId:req.user._id});
        await post.save();
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({"message":error.message})
    }

})

// delete Post

postRouter.delete("/post/:id", auth,async(req,res)=>{
    try {
        const post = await PostModel.findOne({_id: req.params.id,authorId:req.user._id});
        await post.save();
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({"message":error.message})
    }

})

module.exports={
    postRouter,
}