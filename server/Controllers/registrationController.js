import User from '../models/userModel.js';


export const regSection1= async(req,res)=>{
    const userId = req.user.id;
    const {gender, age, dob, hobbies, interest, smoking, drinking, qualification, profilePic,additionalImages,shortReel} = req.body
    
    
try{
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.gender=gender
    user.age = age; 
    user.dob = dob;
    user.hobbies = hobbies;
    user.interest = interest;   
    user.smoking = smoking;
    user.drinking = drinking;
    user.qualification = qualification;
    user.profilePic = profilePic;
    user.additionalImages = additionalImages;
    user.shortReel = shortReel;
   await user.save()
   res.status(200).json({ success: true, message: 'RegSection1 successfully saved' });
}catch(err){
    console.error('Error saving user:', err);
      res.status(500).json({ success: false, message: 'Internal server error. Try Again' });
}
}

export const regSection2= async (req,res)=>{

  const userId = req.user.id;
    const { employmentType, companyName,designation,location, title, expertiseLevel} = req.body
    
try{
    const user = await User.findById(userId);
    if (!user)
       {
      return res.status(404).json({ message: 'User not found' });
    }
    user.employmentType = employmentType;

if(user.employmentType === "employee" || user.employmentType === "employer"){
 user.companyName = companyName;
  user.designation= designation;
  user.location= location;
  user.employmentType=employmentType;
}else if(user.employmentType === "jobseeker"){
  user.title=title;
  user.expertiseLevel= expertiseLevel;
  user.employmentType=employmentType;
}  
   await user.save()
   res.status(200).json({ success: true, message: 'RegSection2 successfully saved' });
}catch(err){
    console.error('Error saving user:', err);
      res.status(500).json({ success: false, message: 'Internal server error. Try Again' });
}
}

export const regSection3 = async (req,res) =>{
  const userId = req.user.id;
  
    const { relationshipType,showProfileType } = req.body;
  try {
       
    const user = await User.findById(userId);
    if (!user)
      {
     return res.status(404).json({ message: 'User not found' });
   }
  
user.relationshipType=relationshipType
user.showProfileType=showProfileType
user.isRegistrationComplete = true;
    
    await user.save();

    res.status(201).json({ message: 'Registration completed.' });
  } catch (error) {
    console.error({message:'Error saving registration section 3 data:', error});
    res.status(500).json({ message: 'Failed to save registration section 3 data.' });
  }
}