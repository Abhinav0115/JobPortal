import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type:String,
        select:false
    },
    role:{
        type:String,
        enum:['STUDENT','EMPLOYER','ADMIN'],
        default:'STUDENT'
    },
    profilePic:String
});

const User = mongoose.models.User  || mongoose.model('User', UserSchema);

export default User;