import {ADD_USER,SIGN_IN, GET_USERS} from '../actions/types';


export const addUser=(userData)=>dispatch=>{    
    dispatch({
      type:ADD_USER,
      payload:userData
    })}

export const getUsers=()=>dispatch=>{  
    dispatch({
        type:GET_USERS,
        payload:{}
    })}

export const logIn=(userData)=>dispatch=>{  
   console.log('helo',userData)  
    dispatch({
        type:SIGN_IN,
        payload:userData
    })}    
