// import jwt from 'jsonwebtoken'
// import User from '../models/userModel.js'

// export const authenticate =async (req,res,next)=>{
    
//     const authToken =req.headers.authorization
//   console.log(authToken,"/////////////");
    
//     if(!authToken || !authToken.startsWith('Bearer')){
//         return res.status(401).json({success: false, message: "No token, authorization denied"})
//     }
//     try{        
//         const token=authToken.split(" ")[1]
//         const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
//         req.userId= decoded.id       
//         next()
//     }catch(err){
//         if(err.name === 'TokenExpireError'){
//             return res.status(401).json({ message: 'Token is expired'})
//         }
//         return res.status(401).json({success:false,message:"Invalid token"})
//     }
// }

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
    
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
     
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select('-password');
      

      
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;


