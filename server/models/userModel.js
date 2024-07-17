import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String ,
    required:function(){
    return !this.googleId
  }},
  name: { type: String, required: true },
  phone: { type: Number },
  googleId: { type: String, default: null },
  dob: {
    type: Date
},
age: {
    type: Number,
    required: true
},
hobbies: {
    type: String
},
qualification: {
    type: String,
    
},
interest: {
    type: String
},
drinking: {
    type: String
},
smoking: {
    type: String
},
profilePic: {
    type: String
},
additionalImages: {
    type: [String]
},
shortReel: {
    type: String
},
employmentType:{
    type:String
},
companyName:{
    type:String
},
designation:{
    type:String
},
location:{
    type:String
},
title:{
    type:String
},
expertiseLevel:{
    type:String
},
relationshipType: {
    type: String,
    required: true,
    enum: ['Short Term Relationship', 'Long Term Relationship'],
  },
  isRegistrationComplete: { type: Boolean, default: false },
createdAt: {
    type: Date,
    default: Date.now
},
updatedAt: {
    type: Date,
    default: Date.now
},
  registration_date: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
