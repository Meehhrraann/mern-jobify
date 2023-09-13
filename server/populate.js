import {readFile} from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import Job from './models/Job.js'

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URL)
    await Job.deleteMany() // delete all previous Job data in mongodb *optional*
    const jsonProducts = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url))) // data from mock-data
    await Job.create(jsonProducts) // import jsonProducts to mongoodb
    console.log('Success!!!');
    process.exit(0) // end process with success
} catch (error) {
    console.log(error);
    process.exit(1) // end process with failure
  }
}

start()

// for import data to mongoo db :
// node populate