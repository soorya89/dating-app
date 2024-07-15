import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from "./Routes/auth.js"
import passport from './utils/passport.js'
import session from 'express-session';
// import cookieSession from 'cookie-session'


import registrationRoute from './Routes/registration.js'



dotenv.config()

const app=express()
const port=process.env.PORT || 8000

const corsOption={
    origin:true,
    credentials: true,
}

app.get('/',(req,res)=>{
    res.send('Api is working')
})



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen( () => {
      console.log("MongoDB connected");
    });
  })
  .catch((err) => {
    console.error('MongoDB database connection failed:', err);
  });


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))

// app.use(
//   cookieSession({name:'session',keys:['dating'],maxAge:24*60*60})
// )
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth',authRoute)
app.use('/api/register',registrationRoute)

app.listen(port,()=>{
    
    console.log("Server is running on port" +port);
})


