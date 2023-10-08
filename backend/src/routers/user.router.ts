import { Router } from 'express';
import jwt from 'jsonwebtoken'
import  asyncHandler  from 'express-async-handler';
import { IUser, UserModel } from '../models/user.model';
import { IAdmin, AdminModel } from '../models/admin.model';
import bcrypt from 'bcryptjs';

const router = Router();

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        id: user.id
    },"Expires In",{
        expiresIn: "30d"
    })
    return {
        Level: user.Level,
        id: user.id,
        email: user.email,
        password: user.password,
        Fullname: user.Fullname,
        username: user.username,
        ORdoc: user.ORdoc,         
        CRdoc: user.CRdoc,
        StudyLoad: user.StudyLoad,
        IDdoc: user.IDdoc,
        Payment: user.Payment,
        VMake: user.VMake,
        VModel: user.VModel,
        VPlateNo: user.VPlateNo,
        token: token,
      };
}

router.post("/user/login",  asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({ email });
      if(!user){                                                                   
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

router.post("/login",  asyncHandler(
  async (req, res) => {
    const {username, password} = req.body;
    var user = await AdminModel.findOne({ username });
    if (!user) {
      user = await UserModel.findOne({ 'id': username, 'isRegistered': true });
    }
    if(!user){                                                                   
      res.status(400).send("User does not exist");
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

router.post('/user/register', asyncHandler(
    async (req, res) => {
      const {id, Fullname, email, password, VMake, VModel, VPlateNo} = req.body;
      const user = await UserModel.findOne({id});
      if(user){
        res.status(400)
        .send('ID Number Already Exist!');
        return;
      }
    const salt = await bcrypt.genSalt(10); 
    const newUser:IUser = {
      id,
      username: id,
      Fullname,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, salt),       //hash and salts the password with bcrypt
      ORdoc: '',
      CRdoc: '',
      StudyLoad: '',
      IDdoc: '',
      Payment: '',
      Level: 1,
      VMake,
      VModel,
      VPlateNo,
      isRegistered: false
    }
    const dbUser = await UserModel.create(newUser);  
    res.send(dbUser);
  }
))

router.post('/admin/register', asyncHandler(
  async (req, res) => {
    const {Fullname, username, password} = req.body;
    const admin = await AdminModel.findOne({username});
    const count = await AdminModel.count();
    if(admin){
      res.status(400)
      .send('Username already exist!');
      return;
    }
  const salt = await bcrypt.genSalt(10); 
  const newAdmin:IAdmin = {
    id: count.toString(),
    Fullname,
    username: username.toLowerCase(),
    password: await bcrypt.hash(password, salt),       //hash and salts the password with bcrypt
    Level: 3,
  }

  const dbUser = await AdminModel.create(newAdmin);  
  res.send(generateTokenResponse(dbUser));
}
))

router.get("/user/pending", asyncHandler(
  async (req, res) =>{
      const users = await UserModel.find({isRegistered: false});
      res.send(users);                       //sending items from database
  }
))

export default router;