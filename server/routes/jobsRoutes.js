import express from 'express';
const router = express.Router()

import {createJob, deleteJob, getAllJobs, updateJob, showStats} from '../controllers/jobsController.js'

router.route('/').post(createJob)
router.route('/').get(getAllJobs)
router.route('/stats').get(showStats) // place before :id
router.route('/:id').delete(deleteJob)
router.route('/:id').patch(updateJob)

export default router