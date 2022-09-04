import  express  from "express";
import {
    register,
    login, 
    currentUser
}  
from "../controllers/auth"

//middleware
import {requireSignin} from "../middleware/auth";

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/current-user',requireSignin, currentUser);



module.exports= router;