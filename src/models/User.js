import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String },   
    contacto: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]    
});

const User = mongoose.model('User', UserSchema);

export default User