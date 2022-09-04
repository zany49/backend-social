import mongoose from 'mongoose';
const crypto = require ( 'crypto' )
import bcrypt from 'bcrypt';


const {Schema} = mongoose;


//no sql to collect data from frontend
const userSchema = new Schema({

    password:
    { 
        type: String,
         required: true,
         min:6,
         max:64,
    },
    username:{
        type: String,
        unique: true,
        required: true,
    }
},
//passing as second argument
{ 
    collection:'authUser',
    timestamps:true,
}
);

userSchema.statics.comparePassword = function(password,hashed) {
    return bcrypt.compare(password,hashed);
}

userSchema.statics.generateHash = function(password, salt) {
    try {
      const hmac = crypto.createHmac('sha1',salt)
      hmac.update(password)
      return hmac.digest('hex')
    } catch (err) {
      return err
    }
  }

  userSchema.statics.generateSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
}

  

userSchema.statics.authenticate = function(given_password, hashed_password, salt) {
    return userSchema.statics.generateHash(given_password, salt) === hashed_password
}


export default mongoose.model('User', userSchema);







