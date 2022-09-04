import {expressjwt} from 'express-jwt';
import Post from '../models/post' ;
import User from '../models/user' 
const ObjectId = require('mongoose').Types.ObjectId
//to forcelogout

export const requireSignin= expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
})

export const canEditDeletePost= async (req,res,next) => {
    try{
        const post = await Post.findById(req.params._id);
        console.log("post-->",post.postedBy._id,req.params._id,req.body.currentuser,req.params.name);
        // console.log("psost in middileware",post);
        if(req.body.currentuser !== undefined){
            const user = await User.findOne({username:req.body.currentuser});

            if(String(user._id) === String(post.postedBy)) {
                next();
                
            }else{
                return res.status(400).send("unauthorized")
            }
        }else{
            const user = await User.findOne({username:req.params.name});
            if(String(user._id) === String(post.postedBy)) {
                next();
                
            }else{
                return res.status(400).send("unauthorized")
            }
        }
      
   
    }catch(err) {
        console.error(err);
    }
}
