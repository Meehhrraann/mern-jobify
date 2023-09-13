// this component is for protected routes + refer *userId* to protected routes for fetch data's  
// use this middleware before protected routes
import jwt from 'jsonwebtoken'
import {UnAuthenticatedError} from "../errors/index.js";

const auth = async (req, res, next) =>{
    // ***authorization in header using Bearer token ***
    // const authHeader = req.headers.authorization
    // if(!authHeader || !authHeader.startsWith('Bearer')){
    //     throw new UnAuthenticatedError('Authentication Invalid')
    // }
    // const token = authHeader.split(' ')[1]
    const token = req.cookies.token // ***Cookie*** instead authorization in header
    if(!token){
        throw new UnAuthenticatedError('Authentication Invalid')
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) // payload = {userId + exp}
        req.user = {userId: payload.userId} // refer userId to req.user
        next();
    } catch (error) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }


}

export default auth