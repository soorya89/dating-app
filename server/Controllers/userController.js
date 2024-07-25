import User from "../models/userModel.js";


export const updateUser = async (req,res)=>{
    
    const id=req.params.id
    console.log(id);
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body},{new:true})
        res.status(200).json({success:true , message:"Successfully Updted",data:updatedUser})
    }catch(err){
        res.status(500).json({success:false , message:"Failed to Updte"}) 
    }     
}  
export const updatePhoto= async (req,res)=>{
    
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
    console.log(req.user,"//////////");     
    console.log(userId, "userId");

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


