
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';




passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope:["profile","email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let existingUser = await User.findOne({ googleId: profile.id });
        if(existingUser){
          return done(null,existingUser)
        }
    
    const    user = await new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: '', // Since we're using OAuth, no password is required
        })
        .save();
      

      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    User.findById(id).then(user => {
      done(null, user);
    });
  } catch (err) {
    done(err, null);
  }
});
// passport.use(new GoogleStrategy({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/api/auth/google/callback",
//       scope:["profile","email"]
//     },
//   async (accessToken, refreshToken, profile, done) => {
//       try {
//           let user = await User.findOne({ googleId: profile.id });

//           if (!user) {
              
//               user = new User({
//                   googleId: profile.id,
//                   first_name: profile.name.givenName,
//                   last_name:profile.name.familyName,
//                   email: profile.emails[0].value,
//               });
              
//               await user.save();
//               user.isNewUser=true;
//           }else{
//               user.isNewUser=false
//           }
//         //   const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
          
//           return done(null, {user,token});

//       } catch (error) {
//           return done(error, null);
//       }
//   })
// );
 export default passport;


























// import session from 'express-session'
// import passport from 'passport'
// import {Strategy as googleStrategy} from 'passport-google-oauth20'

// const Passport = (app) =>{
// app.use(
//     session({
//         secret:process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: true,
//         cookie:{
//             maxAge: 1000*60*60*24 //1 day
//         }
//     })
// )
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(
//     new googleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback',
//       },
//       (accessToken, refreshToken, profile, done) => { 
//         return done(null, profile);
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });

//   passport.deserializeUser((obj, done) => {
//     done(null, obj);
//   });
// }

// export default Passport

