import express from 'express';
const router = express.Router();

import rateLimiter from 'express-rate-limit'; // security package
const apiLimiter = rateLimiter({
    windowMs: 15*60*1000, //15min
    max: 10,
    message: 'too many request from this IP, '
})

import { register, login, updateUser, getCurrentUser, logout } from "../controllers/authController.js";    
import authenticateUser from "../middleware/auth.js" // use before protected route
// routes
router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/logout').get(logout) // authenticateUser middleware for protected route
router.route('/updateUser').patch(authenticateUser, updateUser) // authenticateUser middleware for protected route
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser) // authenticateUser middleware for protected route

export default router;