import  express  from "express";
import { createPost, getPost,updatePost, deletePost, updateLike } from "../controllers/Posts.js";


const router = express.Router()

router.get('/', getPost);
router.post('/', createPost )
router.patch('/:id',updatePost )
router.patch('/:id/likePost',updateLike )
router.delete('/:id', deletePost)

export default router