import axios from 'axios';
//import { resolve } from 'path';
//import { resolve } from 'url';
//import signupPage from '../components/SignupPage';

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    const callLoginApi2 = async (email, password) => {
      try {
        console.log('in try block');
        const res = await callLoginApi(email, password);
        await dispatch(setLoginSuccess(true));
        await  dispatch(setAuthToken(res.headers['x-auth']));
        await  dispatch(setLoginPending(false));
      }
      catch(e) {
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(true)); 
        console.log(e); 
      };
    };

  return callLoginApi2(email, password);
  
  };
};
 


export function signup(email,password){
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));

    const callSignupApi2 = async (email, password) => {
      console.log('in try block2');
      const res = await callSignupApi(email, password);

      try{
        if (res.request.status===200)
        {
            await dispatch(setLoginSuccess(true));
            await  dispatch(setAuthToken(res.headers['x-auth']));
            dispatch(setLoginPending(false));
        }
        else {
            
            console.log('in else block');
            console.log('in async catch  block');
            return Promise.reject(res);
        };
      }
      catch(res){
        dispatch(setLoginPending(false));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(true)); 
  
      return Promise.reject(res.data.errmsg.search("duplicate key"));
      };
    };
    return callSignupApi2(email, password);    
  };
};

const callSignupApi = (email, password) =>{
  console.log('axios');
  return axios.post('http://localhost:3000/user/',{
    email,
    password
  }).then((res)=>{
    console.log('res.request.status',res.request.status)
    return(res)
  }).catch((e)=>{
    console.log('signup api',e.response);
    return(e.response);
  });
};


function setLoginPending(bool) {
  console.log('login is pending');
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending : bool,
  };
}

function setLoginSuccess(isLoginSuccess) {
  console.log('login status success');
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess,
  };
}

function setLoginError(loginError) {
 //   console.log('login status error');
  return {
    type: SET_LOGIN_ERROR,
    loginError,
  };
};

export const setAuthToken = (authToken) => {
  //  console.log('setting token',authToken);
  return {
    type: SET_AUTH_TOKEN,
    authToken,
  };
};

const callLoginApi = (email, password) =>{
 //   console.log('axios');
  return axios.post('http://localhost:3000/user/login',{
    email,
    password
  }).then((res)=>{
    // console.log('res login api',res);
    return(res);
  }).catch((e)=>{
    // console.log('callLoginAPi',e);
    return(e);
    //throw(e);
  });
};




   

    // return callLoginApi(email, password).then((res)=>{
    //     dispatch(setLoginSuccess(true));
    //     dispatch(setAuthToken(res.headers['x-auth']));
    //     console.log('setAuthToken');
    // })
    // .then(()=>{dispatch(setLoginPending(false))})
    //     .catch((e)=>{
    //         console.log('in catch', e);
    //         dispatch(setLoginPending(false));
    //         dispatch(setLoginSuccess(false));
    //         dispatch(setLoginError(true));  
    //         return Promise.reject(e);
    // })


    // return callSignupApi(email, password).then((res)=>{
    //     if (res.request.status===200){
    //     console.log('sucess status', res)
    //     dispatch(setLoginSuccess(true));
    //     dispatch(setAuthToken(res.headers['x-auth']));
    //     dispatch(setLoginPending(false));
    //     //resolve();
    //     return;
    // }
    //    else {
    //        console.log('here else',res);     
    //     return Promise.reject(res.data.errmsg.search("duplicate key"));
    // }
      
    // });