import mongoose from 'mongoose';
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength:[3, 'Firstname must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            minlength:[3, 'Firstname must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:[5, 'Email must be at least 3 characters long'],
        // match:
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
        default: null
    },
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export default mongoose.model('User', userSchema);