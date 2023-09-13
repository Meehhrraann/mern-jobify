import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes' 
import {BadRequestError, UnAuthenticatedError} from "../errors/index.js"
import attachCookies from "../utils/attachCookies.js"

const register = async (req, res, next) => {
    // try {
    //   const user = await User.create(req.body) // create user
    //   res.status(201).json({user}) // success + output user
    // } catch (error) {
    //   next(error); //refer error to error-handler middleware
    // }
    // OR install express-async-errors && remove try-catch && import in server.js
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new BadRequestError("Please provide all values")
    }
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError("Email already in use")
    }

    const user = await User.create({name, email, password}) // create user
    const token = user.createJWT() // create token
    attachCookies({res, token}) // ***Cookie***

    res.status(StatusCodes.CREATED).json({ // success + output user & token
        user:{ // refer everything to frontend except password for security
            name: user.name, 
            email: user.email, 
            lastName: user.lastName, 
        }, 
        location: user.location,
        // token //***Cookie instead***
    }) 
}

const login = async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError("please provide all values")
    }
    const user = await User.findOne({email}).select('+password') // password << select: flase >> in schema --then--> we should override password by .select
    if(!user){
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password) // refer entry password to comparePassword method 
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT() // create token
    user.password = undefined // remove overridden password from res for security
    attachCookies({res, token}) // ***Cookie***
    res.status(StatusCodes.OK).json({ // success + output user & token
        user, 
        location: user.location,
        // token //***Cookie instead***
    }) 
}

const updateUser = async (req, res)=>{
    const {email, name, lastName, location} = req.body
    if(!email || !name || !lastName || !location){
        throw new BadRequestError("please provide all values")
    }
    const user = await User.findOne({_id: req.user.userId}) // req.user.userId coming from auth.js middleware
    
    user.name = name 
    user.email = email
    user.lastName = lastName
    user.location = location

    await user.save() // save updated user

    const token = user.createJWT()
    attachCookies({res, token}) // ***Cookie***

    res.status(StatusCodes.OK).json({ // success + output user & token
        user, 
        location: user.location,
        // token //***Cookie instead***
    }) 
}

    const getCurrentUser = async (req, res) => {
        const user = await User.findOne({_id: req.user.userId})
        res.status(StatusCodes.OK).json({ // success + output user + location
            user,
            location: user.location
        })
    }

    const logout = async (req, res) => {
      res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      res.status(StatusCodes.OK).json({msg: 'user logged out!'})
    }

export { register, login, updateUser, getCurrentUser, logout }