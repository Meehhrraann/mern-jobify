import React, { useState, useReducer, useContext, useEffect } from 'react';
import reducer from './reducer';
import axios, { Axios } from "axios";
import { 
  CLEAR_ALERT, 
  DISPLAY_ALERT, 
  REGISTER_USER_BEGIN, 
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_ERROR, 
  LOGIN_USER_BEGIN, 
  LOGIN_USER_ERROR, 
  LOGIN_USER_SUCCESS,
  SETUP_USER_BEGIN, 
  SETUP_USER_ERROR, 
  SETUP_USER_SUCCESS,
  UPDATE_USER_BEGIN, 
  UPDATE_USER_ERROR, 
  UPDATE_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOB_BEGIN,
  GET_JOB_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATE_BEGIN,
  SHOW_STATE_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
 } from "./actions";


// get local storage //***Cookie instead***
// const user = localStorage.getItem('user')
// const token = localStorage.getItem('token')
// const userLocation = localStorage.getItem('location')

const initialState = {
  userLoading: true, // for GET_CURRENT_USER_...
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  //user
  user: null, //user ? JSON.parse(user) : null // stringify ---> should parse //***Cookie instead***
  // token: token, // if doest'n exist ---> will be null by default //***Cookie instead***
  userLocation: '', //userLocation || '' //***Cookie instead***
  showSidebar: false,
  //job
  jobs:[],
  totalJobs: 0,
  numOfPages: 1,
  page:1,
  isEditing: false,
  editJobId:'',
  position:'',
  company:'',
  jobLocation: '', //userLocation || '' //***Cookie instead***
  stats: {},
  monthlyApplications: [],
  // search & job
  jobTypeOptions: ['full-time','part-time','remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending','interview','declined'],
  status: 'pending',
  // search
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']

};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios - custom instance
  const authFetch = axios.create({baseURL:'/api/v1'})
  // axios - request interceptor -> two func: 1. do something before send req 2. error handling //***Cookie instead***
  // authFetch.interceptors.request.use(
  //   (config)=>{
  //     config.headers['Authorization'] = `Bearer ${state.token}`
  //     return config
  //   },(error)=>{
  //     return Promise.reject(error)
  //   }
  // )

  // axios - response interceptor -> two func: 1. status 2xx 2. status un-2xx (error handling)
  authFetch.interceptors.response.use(
    (response)=>{
    return response
    },(error)=>{
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () =>{
    dispatch({type:DISPLAY_ALERT})
    clearAlert();
  }  

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  //***Cookie instead*** - add / remove localStorage
  // const addUserToLocalStorage = ({user, token, location}) =>{
  //   localStorage.setItem('user', JSON.stringify(user)) // user is obj then stringify()
  //   localStorage.setItem('token', token)
  //   localStorage.setItem('location', location)
  // }

  //***Cookie instead***
  // const removeUserFromLocalStorage = () =>{
  //   localStorage.removeItem('user') 
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('location')
  // }
    
    // ****REFACTORING REGISTER AND LOGIN user ****
    // const registerUser = async (currentUser) => {
    //   dispatch({ type:REGISTER_USER_BEGIN }) // register user begin
    //   try {
    //     const response = await axios.post('/api/v1/auth/register', currentUser)
    //     // console.log(response);
    //     const {user, token, location} = response.data // use for local storage
    //     dispatch({type:REGISTER_USER_SUCCESS, payload: {user, token, location}}) // register user success + payload
    //     //add user to local storage
    //     addUserToLocalStorage({user, token, location})
    //   } catch (error) {
    //     console.log(error.response)
    //     dispatch({type:REGISTER_USER_ERROR, payload:{msg: error.response.data.msg}})
    //     clearAlert()
    //   }
    // }

    // ****REFACTORING REGISTER AND LOGIN ****
    // const loginUser = async (currentUser) => {
    //   dispatch({ type:LOGIN_USER_BEGIN }) 
    //   try {
    //     const {data} = await axios.post('/api/v1/auth/login', currentUser)
    //     const {user, token, location} = data
    //     dispatch({type:LOGIN_USER_SUCCESS, payload: {user, token, location}}) 
    //     //add user to local storage
    //     addUserToLocalStorage({user, token, location})
    //   } catch (error) {
    //     dispatch({type:LOGIN_USER_ERROR, payload:{msg: error.response.data.msg}})
    //     clearAlert()
    //   }
    // }
    // *************** USER FUNCS ******************
    const setupUser = async ({currentUser, endPoint, alertText}) => {
      dispatch({ type:SETUP_USER_BEGIN }) 
      try {
        const {data} = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
        const {user, location} = data //***Cookie instead*** delete token
        dispatch({type:SETUP_USER_SUCCESS, payload: {user, location, alertText}}) //***Cookie instead*** delete token
        //add user to local storage
        // addUserToLocalStorage({user, token, location}) //***Cookie instead***
      } catch (error) {
        dispatch({type:SETUP_USER_ERROR, payload:{msg: error.response.data.msg}})
      }
      clearAlert()
    }

    const logoutUser = async()=>{
      await authFetch.get('/auth/logout')
      dispatch({type:LOGOUT_USER})
      // removeUserFromLocalStorage() //***Cookie instead****/
    }
    
    const updateUser = async (currentUser) =>{
      dispatch({type:UPDATE_USER_BEGIN})
      try {
        const {data} = await authFetch.patch('/auth/updateUser', currentUser)
        const {user, location} = data //***Cookie instead*** delete token
        dispatch({type:UPDATE_USER_SUCCESS, payload:{user, location}}) //***Cookie instead*** delete token
        // addUserToLocalStorage({user, token, location}) //***Cookie instead****/
      } catch (error) {
        dispatch({type:UPDATE_USER_ERROR, payload:{msg: error.response.data.msg}})
      }
      clearAlert()
    }

    const getCurrentUser = async (currentUser) =>{
      dispatch({type:GET_CURRENT_USER_BEGIN})
      try {
        const {data} = await authFetch.get('/auth/getCurrentUser')
        const {user, location} = data
        dispatch({type:GET_CURRENT_USER_SUCCESS, payload:{user, location}})
      } catch (error) {
        if (error.response.status === 401) { //unauthorized error
          return
        }
        logoutUser()
      }
    }
    useEffect(()=>{
      getCurrentUser()
    }, [])

    //***************** JOB FUNCS *************************
    const createJob = async () =>{
      dispatch({type:CREATE_JOB_BEGIN})
      try {
        const {company, position, jobLocation, status, jobType} = state // data's are globally accessible
        await authFetch.post('/jobs', {company, position, jobLocation, status, jobType}) // authFetch ---> because authenticationUser middleware
        dispatch({type:CREATE_JOB_SUCCESS})
        dispatch({type:CLEAR_VALUES})
      } catch (error) {
        if (error.response.status === 401) { //unauthorized error
          return
        }
        dispatch({type:CREATE_JOB_ERROR, payload:{msg: error.response.data.msg}})
      }
      clearAlert()
    }

    const getJobs = async () =>{
      const {page, search, searchStatus, searchType, sort } = state
      let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
      if(search){ url = url + `&search=${search}` }
      dispatch({type: GET_JOB_BEGIN})
      try {
        const { data } = await authFetch.get(url)
        const { jobs, totalJobs, numOfPages } = data
        dispatch({type: GET_JOB_SUCCESS, payload:{jobs, totalJobs, numOfPages}})
      } catch (error) {
        logoutUser()
      }
      clearAlert()
    }

    const setEditJob = (id) =>{
      dispatch({type: SET_EDIT_JOB, payload:{id}})
    }
    const editJob = async () =>{
      dispatch({type: EDIT_JOB_BEGIN})
      try {
        const {position, company, jobLocation, jobType, status} = state

        await authFetch.patch(`/jobs/${state.editJobId}`, {position, company, jobLocation, jobType, status })
        dispatch({type: EDIT_JOB_SUCCESS})
        dispatch({type: CLEAR_VALUES})
      } catch (error) {
        if(error.response.status === 401) {return}
        dispatch({type:EDIT_JOB_ERROR, payload:{msg:error.response.data.msg}})
      }
      clearAlert()
    }

    const deleteJob = async (id) =>{
      // there is no alert instead getJobs()
      dispatch({type: DELETE_JOB_BEGIN, payload:{id}})
      try {
        await authFetch.delete(`/jobs/${id}`)
        getJobs()
      } catch (error) {
        logoutUser()
      }
    }

    const showStats = async() => {
      dispatch({type:SHOW_STATE_BEGIN})
      try {
        const {data} = await authFetch.get('/jobs/stats')
        console.log(data)
        // const{defaultStats, monthlyApplications} = data
        dispatch({type:SHOW_STATE_SUCCESS, payload:{stats: data.defaultStats, monthlyApplications: data.monthlyApplications}})
      } catch (error) {
        logoutUser()
      }
      clearAlert()
    }

    //***************** HANDLER FUNCS *******************
    const toggleSidebar = ()=>{
      dispatch({type:TOGGLE_SIDEBAR})
    }

    const handleChange =({name, value})=>{
      console.log({name, value})
      dispatch({type:HANDLE_CHANGE, payload:{name, value}} )
    }
    
    const clearValues =()=>{
      dispatch({type:CLEAR_VALUES})
    }
    
    const clearFilters =()=>{
      dispatch({type:CLEAR_FILTERS})
    }

    const changePage = (page) => {
      dispatch({type:CHANGE_PAGE, payload:{page}})
    }

    useEffect(()=>{
      getJobs()
    }, [])
    
    return (
      <AppContext.Provider value={{
        ...state, 
        initialState, 
        displayAlert, 
        setupUser, 
        toggleSidebar, 
        logoutUser, 
        updateUser, 
        handleChange, 
        clearValues, 
        createJob, 
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage
      }}>
        {children}
    </AppContext.Provider>
  );
};
// make sure use
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };