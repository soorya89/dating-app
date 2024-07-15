import express from 'express';
import passport from 'passport';
import { register, login ,sendOtp,checkOtp} from '../Controllers/authController.js';
import {regSection1} from '../Controllers/registrationController.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-verification',sendOtp)
router.post('/check-verification',checkOtp)
router.post('/register-section1',regSection1)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login/failed' }),
    (req,res)=>{
      try{
        res.redirect('http://localhost:5173/register-section1')
      }catch(err){
        console.error(err)
        re.status(500).send('internal server error')
      }
      

    }
 
);
export default router;
