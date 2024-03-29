import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
  
},
{timestamps: true}
)

const User =  mongoose.model("User" , userSchema);
export default User;