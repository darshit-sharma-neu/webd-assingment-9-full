import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String
    }
}))

export default User;