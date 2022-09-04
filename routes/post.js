import  express  from "express";

//middleware
import {requireSignin,canEditDeletePost} from "../middleware/auth";
import {createpost,
    allPost,
    singlePost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    addthread
} from "../controllers/post"

const router = express.Router();

router.post('/create-post',requireSignin,createpost);

//post

router.get('/user-posts',requireSignin,allPost)
router.get('/user-posts/:_id',requireSignin,singlePost)
router.put('/update-posts/:_id',requireSignin,canEditDeletePost,updatePost)
router.delete('/delete-posts/:_id/:name',requireSignin,canEditDeletePost,deletePost)
router.put('/post-like',requireSignin,likePost);
router.put('/post-unlike',requireSignin,unlikePost)

router.put('/add-thread/:_id',requireSignin,canEditDeletePost,addthread);



module.exports= router;