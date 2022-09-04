import Post from "../models/post";
import User from "../models/user"
const { ObjectID } = require('mongodb');



export const createpost = async (req,res)=>{
    console.log("post",req.body,req.body.postedBy);

    const {content} = req.body;
    if(!content.length){
        return res.json(
            {
                error: 'Content is required',
            }

        );

    }
    const existing = await User.findOne({username:req.body.postedBy});
    console.log("existing-->",existing)
    try{
            const post = new Post({content, postedBy: existing._id});
            await post.save();

            const postwithUser = await Post.findById(post._id)
            .populate("postedBy","-password -secret");
            res.json(postwithUser)
            // res.json(post);
       
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }



}


export const allPost=async (req, res)=>{
    try {
        // const post = await Post.find({postedBy: req.user._id})
        const post = await Post.find({})
        .populate('postedBy','_id username')
        .sort({ createdAt: -1}) //-1 for latestpost
        .limit(10);
        // console.log("post=>",post)
        res.json(post)
    }catch(err){
        console.log(err);
    }

}

export const singlePost = async (req, res)=>{
    try{
        const post = await Post.findById(req.params._id)
        .populate('postedBy','_id username')
        // .populate("comments.postedBy",'_id username');
        res.json(post);
    }catch(err){
        console.log(err);
    }
}
export const updatePost= async (req, res) => {
   
    try{
        const post = await Post.findByIdAndUpdate(req.params._id,req.body,{
            new: true,
        });
        res.json(post);
    }catch(err){
        console.log(err)
    }
}
export const deletePost= async (req, res) => {

    try{
        const post = await Post.findByIdAndDelete(req.params._id);
        res.json({ok: true});
    }catch(err){
        console.log(err)
    }
}


export const likePost = async (req, res)=>{
    console.log(req.body)
    const existing = await User.findOne({username:req.body.currentuser});
   
    try{
        const post = await Post.findByIdAndUpdate(req.body._id,{
            $addToSet:{likes: existing._id},
        },
        {new:true});
        res.json(post)
    }catch(err){
        console.log(err)
    }

}


export const unlikePost = async (req, res)=>{
    console.log(req.body)
    const existing = await User.findOne({username:req.body.currentuser});
   
    try{
        const post = await Post.findByIdAndUpdate(req.body._id,{
            $pull:{likes: existing._id},
        },
        {new:true});
            res.json(post)
    }catch(err){
        console.log(err)
    }


}



export const addthread =async(req, res)=>{
    try{
        console.log(req.params)
        const {thread} = req.body;
        const {_id} = req.params;
        const existing = await User.findOne({username:req.body.currentuser});
        const result = await Post.findByIdAndUpdate(_id,{
            $push:{threadPost:{
                text:thread,
                postedBy: existing._id,
                threadTo:_id
            }},
        },{new:true})
        .populate('postedBy','_id username')
        res.json(result)

    }catch(err){
        console.log(err);
    }
}



