import  mongoose  from "mongoose";

const { ObjectId } = mongoose.Schema;


const postSchema = new mongoose.Schema({
    content:{
        type:{},
        required: true,
    },
    postedBy:{
        type: ObjectId,
        ref: "User",
    },
    likes:[{type: ObjectId, ref:"User"}],
    threadPost:[{
        text: String,
        created: {type:Date, default: Date.now},
        postedBy: {
            type: ObjectId,
            ref: "User",
        },threadTo: {
            type: ObjectId,
            ref: "Post",
        }
    }],
},
{
    collection:'postUser',
    timestamps:true
}
)


export default mongoose.model("Post", postSchema)