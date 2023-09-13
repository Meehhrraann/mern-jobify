// useReducer is like useState + logic(switch& case)
// dispatch action's == setXxxx, setYyyy, ...
import { 
  CLEAR_ALERT, 
  DISPLAY_ALERT, 
  REGISTER_USER_BEGIN, 
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_ERROR, 
  LOGIN_USER_BEGIN, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN, 
  SETUP_USER_ERROR, 
  SETUP_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
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
  GET_CURRENT_USER_SUCCESS
} from "./actions";
import { initialState } from "./appContext";


const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
          ...state,
          showAlert: true,
          alertType: 'danger',
          alertText: 'Please provide all values!',
        };
      }
      if (action.type === CLEAR_ALERT) {
        return {
          ...state,
          showAlert: false,
          alertType: '',
          alertText: '',
        };
      }
      if(action.type === REGISTER_USER_BEGIN){
        return {
          ...state,
          isLoading: true
        }
      }
      if(action.type === REGISTER_USER_SUCCESS){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'User created, redirecting...',
          user: action.payload.user,
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          // token: action.payload.token //***Cookie instead****/
        }
      }
      if(action.type === REGISTER_USER_ERROR){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
      if(action.type === LOGIN_USER_BEGIN){
        return {
          ...state,
          isLoading: true,
        }
      }
      if(action.type === LOGIN_USER_SUCCESS){
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          // token: action.payload.token, //***Cookie instead****/
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          showAlert: true,
          alertType: 'success',
          alertText: 'Login Successful, Redirecting...',
        }
      }
      if(action.type === LOGIN_USER_ERROR){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
      if(action.type === SETUP_USER_BEGIN){
        return {
          ...state,
          isLoading: true,
        }
      }
      if(action.type === SETUP_USER_SUCCESS){
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          // token: action.payload.token, //***Cookie instead****/
          userLocation: action.payload.location,
          jobLocation: action.payload.location,
          showAlert: true,
          alertType: 'success',
          alertText: action.payload.alertText,
        }
      }
      if(action.type === SETUP_USER_ERROR){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
      if(action.type === UPDATE_USER_BEGIN){
        return {
          ...state,
          isLoading: true,
        }
      }
      if(action.type === UPDATE_USER_SUCCESS){
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          // token: action.payload.token, //***Cookie instead****/
          jobLocation: action.payload.location,
          userLocation: action.payload.location,
          showAlert: true,
          alertType: 'success',
          alertText: 'User Profile Updated!'
        }
      }
      if(action.type === UPDATE_USER_ERROR){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg
        }
      }
      if(action.type === GET_CURRENT_USER_BEGIN){
        return{
          ...state,
          userLoading: true,
          showAlert: false
        }
      }
      if(action.type === GET_CURRENT_USER_SUCCESS){
        return{
          ...state,
          userLoading: false,
          user: action.payload.user,
          userLocation: action.payload.location,
          jobLocation: action.payload.location
        }
      }
      if(action.type === TOGGLE_SIDEBAR){
        return {
          ...state,
          showSidebar: !state.showSidebar
        }
    }
    if(action.type === LOGOUT_USER){
      return {
        ...initialState,
        userLoading: false,
        // token: null, //***Cookie instead****/
        // user: null, //***Cookie instead****/
        // userLocation: '', //***Cookie instead****/
        // jobLocation: '', //***Cookie instead****/
      }
  }
  if(action.type === CREATE_JOB_BEGIN){
    return{
      ...state, 
      isLoading: true, 
    }
  }
  if(action.type === CREATE_JOB_SUCCESS){
    return{
      ...state,  
      isLoading: false, 
      showAlert: true,
      alertText: 'Job Created',
      alertType: 'success'
    }
  }
  if(action.type === CREATE_JOB_ERROR){
    return{
      ...state,  
      isLoading: false, 
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger'
    }
  }
  if(action.type === GET_JOB_BEGIN){
    return{
      ...state, 
      isLoading: true, 
      showAlert: false // if fast navigate to the other page ---> don't show prev alert
    }
  }
  if(action.type === GET_JOB_SUCCESS){
    return{
      ...state, 
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages
     
    }
  }
  if(action.type === SET_EDIT_JOB){
    // find the job for edit
    const job = state.jobs.find((job) => job._id === action.payload.id)
    const {_id, position, jobLocation, jobType, status, company } = job
    return{
      ...state, 
      isEditing: true,
      editJobId: _id,
      position, //position: position
      company,
      jobLocation,
      jobType,
      status
    }
  }
  if(action.type === EDIT_JOB_BEGIN){
    return{
    ...state,
    isLoading: true,
  }}
  if(action.type === EDIT_JOB_SUCCESS){
    return{
    ...state,
    isLoading: false,
    showAlert: true,
    alertText: 'Edit job successfully!',
    alertType: 'success'
  }}
  if(action.type === EDIT_JOB_ERROR){
    return{
    ...state,
    isLoading: false,
    showAlert: true,
    alertText: action.payload.msg,
    alertType: 'danger'
  }}
  if(action.type === DELETE_JOB_BEGIN){
    return{
      ...state, 
      isLoading: true,
    }
  }
  if(action.type === SHOW_STATE_BEGIN){
    return{
      ...state, 
      isLoading: true,
      showAlert: false
  }
}
  if(action.type === SHOW_STATE_SUCCESS){
    return{
      ...state, 
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications
  }
}
  if (action.type === HANDLE_CHANGE) {
    return{
      ...state,
      page: 1, // after every single change ---> start page from 1
      [action.payload.name]: action.payload.value // Dynamic two-way binding
    }
  }
  if(action.type === CLEAR_VALUES){
    return{
      ...state,
      isEditing: false,
      editJobId:'',
      position:'',
      company:'',
      jobLocation: state.userLocation || '',
      jobType: 'full-time',
      status: 'pending',
    }
  }
  if(action.type === CLEAR_FILTERS){
    return{
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest'
    }
  }
  if(action.type === CHANGE_PAGE){
    return{
      ...state,
      page: action.payload.page
    }
  }
    throw new Error(`no such action :${action.type}`);
  };
  export default reducer;