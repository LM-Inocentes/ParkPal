import { Router } from 'express';
import jwt from 'jsonwebtoken'
import  asyncHandler  from 'express-async-handler';
import { IUser, UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs';

const router = Router();

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        id: user.id
    },"Some Text",{
        expiresIn: "30d"
    })
    return {
        id: user.id,
        email: user.email,
        password: user.password,
        Fullname: user.Fullname,
        contactinfo: user.contactinfo,
        token: token,
      };
}

router.post("/login",  asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({ email });
      if(!user){                                                                    //if user email does not exist
        res.status(400).send("Email does not exist");
        return;
      }
      const isPassMatch = await bcrypt.compare(password, user.password);           
      if(isPassMatch) {
        res.send(generateTokenResponse(user));
        return;
      }
      res.status(400).send("Incorrect Password"); 
    }
))

router.post('/register', asyncHandler(
    async (req, res) => {
      const {id, Fullname, email, contactinfo, password} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(400)
        .send('User email already exist!');
        return;
      }
    const salt = await bcrypt.genSalt(10); 
    const newUser:IUser = {
      id,
      Fullname,
      email: email.toLowerCase(),
      contactinfo,
      password: await bcrypt.hash(password, salt),       //hash and salts the password with bcrypt
      ORdoc: '',
      CRdoc: '',
      StudyLoad: '',
      IDdoc: '',
      Payment: '',
      Level: '1',
    }

    const dbUser = await UserModel.create(newUser);  
    res.send(generateTokenResponse(dbUser));
  }
))


export default router;