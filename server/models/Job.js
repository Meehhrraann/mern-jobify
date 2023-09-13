import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide a company'],
        maxLenght: 50, 
    },
    position: {
        type: String,
        required: [true, 'please provide a position'],
        maxLenght: 100, 
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time',
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a user'],
    }  
},
// created job TIME : 1.createdAt 2.updatedAt
{timestamps: true}
)

export default mongoose.model('Job', JobSchema)