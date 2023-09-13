import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name'],
        minLength: 3,
        maxLenght: 20,
        trim: true /*remove white-space*/,
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        validate:{
            validator:validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true /*check the email isn't already exist*/ 
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minLength: 6,
        select: false // exclude password from response in frontend for security
    },
    lastName: {
        type: String,
        maxLenght: 20,
        trim: true /*remove white-space*/,
        default: 'lastName'
    },
    location: {
        type: String,
        maxLenght: 20,
        trim: true /*remove white-space*/,
        default: 'my city'
    },
})

UserSchema.pre('save', async function (){ // before .save (create something in controller) do some stuff (hash password)
    if(!this.isModified('password')) return // if password doesn't update or doesn't exist ...create password...
        const salt = await bcrypt.genSalt(10) // generate a random string
        this.password = await bcrypt.hash(this.password, salt); // add salt for more security
    
})

UserSchema.methods.createJWT = function (){
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET , {expiresIn: process.env.JWT_LIFETIME}) // jwt.sign(payload, secret, option)
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password) // compare entry password with password
    return isMatch
}

export default mongoose.model('User', UserSchema)