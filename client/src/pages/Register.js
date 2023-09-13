import React, { useEffect, useState } from "react";
import {Logo, FormRow, Alert} from "../components/index";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from '../context/appContext';
import {useNavigate} from 'react-router-dom' //navigate between pages



const initialState = {
  name: "",
  lastName: "",
  location: "",
  email: "",
  password: "",
  isMember: true,
};

export default function Register() {
  
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState);
  const {user, isLoading, showAlert, displayAlert, setupUser} = useAppContext()

  // two-binding way
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // submit + show alert
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = {name, email, password}
    if(isMember){
      // ****REFACTORING REGISTER AND LOGIN ****
      // loginUser(currentUser)
      setupUser({currentUser, endPoint:'login', alertText:'Login Successful!, Redirecting...'})
    }else{
      // ****REFACTORING REGISTER AND LOGIN ****
      // registerUser(currentUser)
      setupUser({currentUser, endPoint:'register' ,alertText:'user created!, Redirecting...'})
    }
  };
  
  // register OR login mode switcher
  const toggleMember = () => {
    setValues({...values, isMember:!values.isMember});
    // console.log(values)
  }

  // navigate to dashboard page after register new user
  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/')
      },3000)
    }
  },[user, navigate])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        {!values.isMember ? <h3>Register</h3> : <h3>Login</h3>}
        {showAlert && <Alert success={false}/>}
        {!values.isMember && <FormRow type='text' value={values.name} name='name' handleChange={handleChange} labelText='Name'  />}
        <FormRow type='email' value={values.email} name='email' handleChange={handleChange} labelText='Email'  />
        <FormRow type='password' value={values.password} name='password' handleChange={handleChange} labelText='Password'  />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>{!values.isMember ? 'Already a member?' : 'Not a member yet?'} <button className="member-btn" type='button' onClick={toggleMember}>{values.isMember ? 'Register' : 'Login'}</button></p>
      </form>
    </Wrapper>
  );
}
