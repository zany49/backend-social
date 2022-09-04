import {register,login} from '../controllers/auth';
import User from '../models/user'
import {hashPassword} from '../helpers/auth'

jest.mock('../helpers/auth',()=>({
    hashPassword: jest.fn(()=> 'hash password')
}))

// jest.mock('../helpers/auth',()=>({
//     comparePassword: 'fake_password'
// }))
jest.mock('../models/user')

const res = {
    status:jest.fn((x)=>x),
    json: jest.fn((x)=>x)
}

const req={
    body:{
        username:"fake_username",
        password:"fake_password"
    }
}


it('should return need username, when username is empty ',async ()=>{
    await new User({
        username: "fake_user",
        password: "12345678"
      }).save()
    await register(req,res);
    // expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toBe('fake_user')
})

it('should return 400 when user exist',async ()=>{
    User.findOne.mockImplementationOnce(()=>({
        id:1,
        username: 'username',
        password : 'password'

    }))
    await register(req,res);
    // expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1)
})

it('should return 200 when user reqister',async ()=>{
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



it('should return 400 when user not found while login',async ()=>{
    User.findOne.mockImplementationOnce(()=>({
        id:1,
        username: 'fake_username'
    }))
    await login(req,res);
    User.comparePassword.mockImplementationOnce(()=>({
        password: "fake_password", 
        hashed:'hash password'
    })
        )
    expect(res.json).toHaveBeenCalledTimes(1)
})









