
import User from '../models/user'
import { hashPassword,comparePassword } from '../helpers/auth'
import jwt from 'jsonwebtoken';




export const register =async(req, res)=>{
    // console.log("your registered",req.body);
    const {username,password} = req.body;
  
    if(!username){ 
    return res.json({
        error:"Name Is Required"
    })
  }

    if(!password || password.length< 6) 
    {
      return res.json({error:"Pasword length must be above 6 characters"})
    }
     
     
    
    const existing = await User.findOne({username});
     if (existing) 
     {
        return res.json({error:"username,already taken"})
     }
     
   //hash pwd
    const hashPwd = await hashPassword(password);
    try{
    const user = await User.create({
      username, 
      password: hashPwd ,
    });
    
      // await user.save();
      // console.log("sucessful", user);
      return res.json({
          ok: true,
          message:"user created successfully"
      })
    }catch(err){
       console.log("register failed",err);
       {
         return res.json({
          err:err
        })
       }
       
    }
};




export const login = async (req, res)=>{
try{
    
    const {username , password}= req.body;
    const user = await User.findOne({ username })
    if(!user)  
    {
      res.status(400) 
      res.json({error:"No user Found"})
    }
   
    const match = await comparePassword(password, user.password)
    
    if(!match) 
    {
      return res.json({error:"Wrong password"})
    }
  
    const token = jwt.sign({_id: user.id},process.env.JWT_SECRET,{
      expiresIn: "7d", 
    });
 
    user.password = undefined;
    user.secret = undefined;

    res.json({
      token,
      user,
    })

}catch(err){
    console.error(err);
    {
      return res.json({error:"error,try again"})
    }
}
};


export const currentUser =async(req,res) =>{
try{
    const user = await User.findOne(req.user_id);
    user.password = undefined
    // res.json(user);
    res.json({
      ok: true,
      user: user
    })
}catch(err){
  console.log(err);
  res.sendStatus(400);
}
};





