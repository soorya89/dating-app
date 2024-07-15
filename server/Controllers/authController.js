
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendVerification, checkVerification } from '../utils/twilio.js'



const generateToken =user=>{
    return jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,
    {expiresIn:'2d'})
}

export const register = async(req,res)=>{
    const{name,email,password} = req.body
    try{
        let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.status(200).json({ success: true, message: 'User successfully created' });
    }catch(err){
        console.error(err);
          res.status(500).json({ success: false, message: 'Internal server error. Try Again' });
    }
}

export const login = async(req,res)=>{
    const { email, password } = req.body;
    try{
        let user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({status:false,message:"Invalid credentials"})
        }
        const token = generateToken(user)
        const {password, ...rest} =user._doc
        res.status(200).json({status:true,message:"Successfully login",token,data:{...rest}})

    }catch(err){
        res.status(500).json({status:false,message:"Failed to login"})
    }
}
export const sendOtp= async(req,res)=>{
    const { phone } = req.body;
  console.log(`Received phone number: ${phone}`);
  try {
    const response = await sendVerification(phone);
    console.log('Verification response:', response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification' });
  }
}
export const checkOtp=async(req,res)=>{
    const { phone, code } = req.body;
    try {
      const response = await checkVerification(phone, code);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check verification' });
    } 
}

