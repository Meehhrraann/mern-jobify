import React from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'
import {Alert, FormRow, FormRowSelect} from '../../components/index'

export default function AddJob() {
  const{
    isEditing, 
    showAlert, 
    displayAlert, 
    position, 
    company, 
    jobLocation, 
    jobType, 
    jobTypeOptions, 
    status, 
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob
  } = useAppContext()

  const handleJobInput = (e) =>{
    const name= e.target.name
    const value= e.target.value
    handleChange({name, value})
  }

  const handleSubmit =(e)=>{
    e.preventDefault()

    if (!company || !jobLocation || !position) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    createJob()
     
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3> 
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow type='text' labelText='company' name='company' value={company} handleChange={handleJobInput}/>
          <FormRow type='text' labelText='position' name='position' value={position} handleChange={handleJobInput}/>
          <FormRow type='text' labelText='location' name='jobLocation' value={jobLocation} handleChange={handleJobInput}/>
          <FormRowSelect name='status' value={status} list={statusOptions} handleChange={handleJobInput} />
          <FormRowSelect name='jobType' labelText='type' value={jobType} list={jobTypeOptions} handleChange={handleJobInput} />
          <div className="btn-container">
            <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit}>Submit</button> {/* ENTER-KEY for first btn */}
            <button 
            className="btn btn-block clear-btn" 
            onClick={(e)=>{
            e.preventDefault()  
            clearValues()
            }}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
