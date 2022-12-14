import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const getPost = async (req, res)=>{
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } 
    catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res)=>{
    
    const post = req.body;
    const NewPost = new PostMessage(post)

    try {
        await NewPost.save()
        res.status(201).json(NewPost)
    } 
    catch (error) {
        res.status(409).json({message: error.message})
    }
}

export  const updatePost = async (req, res)=>{
    const _id= req.params.id;
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id")
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true})

    res.json(updatedPost)
}

export const deletePost = async (req, res) =>{
    const _id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("ID id not here")

    await PostMessage.findByIdAndDelete(_id);

    res.json({message: "Post deleted successfully"})
}

export const updateLike = async (req, res) =>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("id not found")

    const post = await PostMessage.findById(id)
    const updatedLike = await PostMessage.findByIdAndUpdate(id, {likeCount:post.likeCount+1}, {new:true})

    res.json(updatedLike)
}