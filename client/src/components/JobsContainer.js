import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/JobsContainer'
import {Loading, Job} from './index'
import PageBtnContainer from './PageBtnContainer'
export default function JobsContainer() {
  const {getJobs, jobs, totalJobs, page, isLoading, search, searchStatus, searchType, sort, numOfPages} = useAppContext()

  useEffect(()=>{
    getJobs()
  }, [page, search, searchStatus, searchType, sort])
  
  // loading
  if (isLoading) {
    return <Loading center/>  
  }

  // no jobs
  if (jobs.length === 0) {
    return(
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }

  // display jobs
  return(
    <Wrapper>
      <h5>{totalJobs} job{totalJobs > 1 && 's'} found</h5>
      <div className="jobs">
        {jobs.map((job)=>{
          return(<Job key={job._id} {...job}/>)
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}
