import User from "../models/userModel.js";


export const updateUser = async (req,res)=>{
    
    const id=req.params.id
    try{
        
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body},{new:true})
        res.status(200).json({success:true , message:"Successfully Updted",data:updatedUser})
    }catch(err){
        res.status(500).json({success:false , message:"Failed to Updte"}) 
    }     
}  
export const updatePhoto= async (req,res)=>{
    const id = req.params.id;
    const { profilePic, additionalImages } = req.body;
    try {
        const updateData = {
            ...(profilePic && { profilePic }),
            ...(additionalImages && { additionalImages }),
        };

        const updatedUser = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        res.status(200).json({ success: true, message: "Photos Successfully Updated", data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to Update Photos" });
    }
}   
export const getSingleUser = async (req,res)=>{
           
    const id=req.params.id       
    try{
        const user = await User.findById(id).select("-password")
        res.status(200).json({success:true , message:"User found",data:user})
    }catch(err){
        res.status(404).json({success:false , message:"Not found"}) 
    }
}
export const getAllUser = async (req,res)=>{  
   
    try{
        const users = await User.find({}).select("-password")
        res.status(200).json({success:true , message:"Users found",data:users})
    }catch(err){   
        res.status(404).json({success:false , message:"Not found"}) 
    }
}
export const getUserProfile = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, ...rest } = user._doc;
        return res.status(200).json({ status: true, message: "Profile info is getting..", data: { ...rest } });
    } catch (err) {
        // Make sure to only send one response
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: "Something went wrong..." });
        }
        // Log the error if headers have already been sent
        console.error("Error occurred:", err);
    }
};


export const getUsersByProfileType = async (req, res) => {
    console.log("[][][][]");
    const userId = req.user._id;    
    console.log(userId,"???????/");

    try {
        const user = await User.findById(userId).select("showProfileType");
        console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: "Logged-in user not found" });
        }
        const showProfileType = user.showProfileType;
        const users = await User.find({ showProfileType }).select("-password");
        console.log(users,"555555555555555555");
        res.status(200).json({ success: true, message: "Users found", data: users });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ success: false, message: "Failed to retrieve users" });
    }
};



