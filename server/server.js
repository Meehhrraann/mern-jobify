// const express= require('express');
import express from 'express';
import cookieParser from 'cookie-parser';
const app = express(); // express
import dotenv from 'dotenv';
dotenv.config()
import 'express-async-errors' // need to import for remove try-catch from controller
import morgan from 'morgan' // in terminal show some info about request

// express can access to file & directory folders
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import path from 'path';

//security packages
import helmet from 'helmet' //Secure by set various header
import xss from 'xss-clean' //Node.js connect middleware to sanitize user input
import mongoSanitize from 'express-mongo-sanitize' //mongodb sanitize

// DB & AuthenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from "./middleware/auth.js" // use before protected route    

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url)) // directory folder
// **dev-only** access to front-end <<build folder>> in localhost://5000 instead of localhost:3000
app.use(express.static(path.resolve(__dirname, '../client/build'))) 
// available json req in CONTROLLERS
app.use(express.json()) 
app.use(cookieParser()) // ***Cookie***

// security packages
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

// routes ---> using controllers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter) // authenticateUser middleware for protected routes
// refer all other path's to front-end 
app.get('*',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname, '../client/build','index.html'))
})

//use middleware
app.use(notFoundMiddleware) // not found 404
app.use(errorHandlerMiddleware) // error handling

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));

    } catch (err) {
        console.log(err)
    }
}

start()