import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "Please provide a username"],
        unique:true
    },
    email:{
        type:String,
        require:[true,"Please enter you email."],
        unique:true,
    },
    password:{
        type:String,
        require:[true,"Please provide your password."],
    },
    isVerified: {
        type:Boolean,
        default:false,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTOkenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

// There is a different way in which you export model in Next MOngo
const User = mongoose.models.users || mongoose.model("users",userSchema);
export default User;

// The first line is to make sure that it is not already created.
// as mongo automatically pluralies and turn it to lowercase.