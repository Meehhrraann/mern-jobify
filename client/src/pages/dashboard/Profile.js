
import React, { useState } from 'react'
import {FormRow, Alert} from '../../components/index'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'


export default function Profile() {
  const {user, showAlert, displayAlert, updateUser, isLoading} = useAppContext()
  const [name, setName]= useState(user?.name)
  const [email, setEmail]= useState(user?.email)
  const [lastName, setLastName]= useState(user?.lastName)
  const [location, setLocation]= useState(user?.location)

  const handleSubmit = (e) => {
    e.preventDefault() 
    if (!name || !lastName || !email || !location) {
      displayAlert()
      return
    }
    console.log('update user')
    updateUser({name, email, lastName, location})
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow type='text' labelText='name' name='name' value={name} handleChange={(e)=>setName(e.target.value)} />
          <FormRow type='text' labelText='last name' name='lastName' value={lastName} handleChange={(e)=>setLastName(e.target.value)} />
          <FormRow type='email' labelText='email' name='email' value={email} handleChange={(e)=>setEmail(e.target.value)} />
          <FormRow type='text' labelText='location' name='location' value={location} handleChange={(e)=>setLocation(e.target.value)} />
          <button className="btn btn-block" type="submit" disabled={isLoading}>{isLoading ? 'please wait' : 'save changes'}</button>
        </div>
      </form>
    </Wrapper>
  )
}
