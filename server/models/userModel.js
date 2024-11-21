import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    creditBalance:{
        type:Number, default:5
    }
})

 const UserModel = mongoose.models.User || mongoose.model('User',userSchema);

 export default UserModel;