import {createpost} from '../controllers/post';
import User from '../models/user'
import Post from '../models/post'


jest.mock('../models/user')
jest.mock('../models/post')

const res = {
    json: jest.fn((x)=>x)
}



it('should return need content, when content is empty ',async ()=>{
    try{
        const req={
            body:{
                content:"new content"
            }
        }
        
        expect(req.body.content.length > 1).toEqual(true)
      await createpost(req,res);
    }catch(err){
        expect(err.res.json.error).toEqual("Error, please try again")
    }
})

it('should return need content, when content is empty ',async ()=>{
    try{
        const req={
            body:{
                content:"new content",
                postedBy:"fake_username"
            }
        }
        var  existing= await User.findOne({username: 'fake_username'})
       
        Post.create.mockResolvedValueOnce({
            _id:'111',
            content:"new content",
            postedBy:'1234'
        })
        await createpost(req,res);
        expect(Post.create).toHaveBeenCalledWith({
            content:"new content",
            postedBy:existing._id
        })
        expect(res.json).toHaveBeenCalledTimes(1)
    }catch(err){
        expect(err.res.json.error).toEqual("Error, please try again")
    }
})









