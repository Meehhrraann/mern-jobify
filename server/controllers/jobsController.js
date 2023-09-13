import Job from '../models/Job.js'
import mongoose from 'mongoose'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, NotFoundError} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import moment from 'moment'

const createJob = async (req, res)=>{
    const {position, company} = req.body

    if(!position || !company){ // because doesn't have default values
        throw new BadRequestError('Please Provide All Values')
    }

    req.body.createdBy = req.user.userId // req.user.userId coming from auth.js middleware

    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
} 

const getAllJobs = async (req, res)=>{
    const {status, jobType, sort, search} = req.query // use query params for SEARCHING
    const queryObject = {createdBy: req.user.userId}  // bare query params without status,... ---> all jobs of one person
    // change bare query params conditionally ---> if don't add something to the query === display all jobs
    if(status && status !== 'all'){ queryObject.status = status } // add status to query params ---> ?status=pending 
    if(jobType && jobType !== 'all'){ queryObject.jobType = jobType } // add jobType to query params ---> ?jobType=full-time
    if(search){ queryObject.position = {$regex: search, $options: 'i' }} // in position state ---> search input case-sensitively
    //NO AWAIT
    let result = Job.find(queryObject)
    //chain sort condition
    if(sort === 'latest'){ result = result.sort('-createdAt') } // latest = -
    if(sort === 'oldest'){ result = result.sort('createdAt') }// oldest = +
    if(sort === 'a-z'){ result = result.sort('position') }
    if(sort === 'z-a'){ result = result.sort('-position') }

    // pagination
    const page= Number(req.query.page) || 1
    const limit= Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const jobs = await result

    const totalJobs = await Job.countDocuments(queryObject) // num of the user job's 
    const numOfPages = Math.ceil(totalJobs/limit)

    res.status(StatusCodes.OK).json({jobs, totalJobs, numOfPages}) // refer jobs
} 

const updateJob = async (req, res)=>{
    const { id:jobId } = req.params // grab from url ---> /:id
    const {position, company} = req.body
    
    if(!position || !company){ // because doesn't have default values
        throw new BadRequestError('Please Provide All Values')
    }
    
    // the job exist OR not
    const job = await Job.findOne({_id: jobId})
    if (!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    
    // check this user can access to this job
    checkPermissions(req.user, job.createdBy)
    
    // updatedJob
    //findOneAndUpdate({jobId}, input from req for updating, {watch & compare ex.enum ---> input properties === req.body properties})
    const updatedJob = await Job.findOneAndUpdate({_id: jobId}, req.body, {new:true, runValidators:true}) //({jobId}, all values need for updating, {watch & compare ---> input properties === req.body properties})
    // Alternative: job.position = position, ...
    
    res.status(StatusCodes.OK).json({ updatedJob }) // just for show in postman
} 

const deleteJob = async (req, res)=>{
    const {id: jobId} = req.params
    
    const job = await Job.findOne({ _id: jobId })

    if(!job){
        throw new NotFoundError(`No job with id: ${jobId}`)
    }

    // check this user can access to this job
    checkPermissions(req.user, job.createdBy)

    await job.deleteOne()
    
    res.status(StatusCodes.OK).json({msg: 'Job deleted successfully'})

} 

//overview : summarize data's to ARRAY ---> reduce date's to OBJECT
const showStats = async (req, res)=>{
    //******* aggregate jobs *********
    let stats = await Job.aggregate([ // aggregate for produce reduced and summarized results with steps
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}}, // 1. get status based on createdBy
        {$group:  {_id: '$status', count: {$sum: 1}}}, // 2. group them based on status --output--> {"_id": "pending", "count": 24}, ...
    ])
    console.log('xxx',req.user.UserId);
    // reduce: reduced and summarized MORE ---> reduce ARRAY to an OBJECT
    stats = stats.reduce((acc, curr)=>{
        const {_id: title, count} = curr // ex. {"pending", 24}
        acc[title] = count // "pending": 24
        return acc // {"pending": 24, ...}
    },{})

    // defaultStats
    const defaultStats = {
        pending: stats.pending || 0,
        declined: stats.declined || 0,
        interview: stats.interview || 0,
    }

    //******* aggregate monthlyApplications *********
    let monthlyApplications = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}}, // string ---> mongoose ObjectId
        {$group: { // group based ---> Σ jobs(_id:{Y,M})
            _id:{year:{$year: '$createdAt'}, month:{$month: '$createdAt'}}, 
            count:{$sum: 1}}
        },
        {$sort: {'_id.year': -1, '_id.month': -1}}, // sort end(now) to start(past) 
        {$limit: 6}, // 6 latest month's
    ])
    monthlyApplications = monthlyApplications.map((item)=>{
        const {_id:{year, month}, count} = item
        const date = moment().month(month - 1).year(year).format('MMM Y') // 0-11 ---> -1
        return {date, count} // 
    }).reverse() // last month ---> last of chart

    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
} 

export {createJob, deleteJob, getAllJobs, updateJob, showStats}