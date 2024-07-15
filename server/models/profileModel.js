import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the name of your User model
        required: true
    },
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
        required: true
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
