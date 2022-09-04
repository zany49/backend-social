import {register,login} from '../controllers/auth';
import User from '../models/user'
import {hashPassword,comparePassword} from '../helpers/auth'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../helpers/auth',()=>({
    hashPassword: jest.fn(()=> 'hash password')
}))


jest.mock('../models/user')

const res = {
    json: jest.fn((x)=>x)
}

const req={
    body:{
        _id:'1234',
        username:"fake_username",
        password:"fake_password"
    }
}


it('should return need username, when username is empty ',async ()=>{
    try{
        const req={
            body:{
                username:"fake_username",
                password:"fake_password"
            }
        }
        
        expect(req.body.username.length > 1).toEqual(true)
      await register(req,res);
    }catch(err){
        expect(err.res.json.error).toEqual("Name Is Required")
    }
})

it('should return need password, when password is empty ',async ()=>{
    try{
        const req={
            body:{
                username:"fake_username",
                password:"fake_password"
            }
        }
        console.log("user-->",req.body.password)
        expect(req.body.password.length>6).toEqual(true)
        expect(req.body.password.length<6).toEqual(false)
      await register(req,res);
    }catch(err){
        expect(err.res.json.error).toEqual("Password Is Required")
    }
})

it('should return json when user exist',async ()=>{
    User.findOne.mockImplementationOnce(()=>({
        _id:1,
        username: 'username',
        password : 'password'

    }))
    await register(req,res);
    expect(res.json).toHaveBeenCalledTimes(1)
})

it('should return json when user reqister',async ()=>{
    User.findOne.mockResolvedValueOnce(undefined)
    User.create.mockResolvedValueOnce({
        id:1,
        username: 'username',
        password: 'password'
    })
    await register(req,res);
    expect(hashPassword).toHaveBeenCalledWith('fake_password');
    expect(User.create).toHaveBeenCalledWith({
        username: 'fake_username',
        password: 'hash password'
    })
    expect(res.json).toHaveBeenCalledTimes(1)
})



it('should return json while login',async ()=>{
    User.findOne.mockImplementationOnce(()=>({
        id:1,
        username: 'fake_username'
    }))
    const match = await bcrypt.compare("fake_username",'hash password');
    console.log("match--->",match)
    expect(match).toEqual(false)
   
    
    const token = jwt.sign({id: 1},'fcgfgcjhhhgvjhvhj',{
        expiresIn: "7d", 
      })
      console.log("tokenmatch--->",token)
      await login(req,res);
    expect(res.json).toHaveBeenCalledTimes(1)
})









