import {ADD_USER,SIGN_IN,GET_USERS} from '../actions/types';

const initialState={
    users:[],
    loggedInUser:{},
    isLoggedIn:false
}

export default function(state=initialState,action){
    let users=[];
    let loggedInUser={};
    let islogged=false;
    switch(action.type){        
        case ADD_USER :           
        users= localStorage.getItem('users');
        if(users==null){
            users=[];
            localStorage.setItem('users', JSON.stringify(users));                
        }
        else{
            users=JSON.parse(localStorage.getItem('users'))
        }
        users.push(action.payload);
        localStorage.setItem('users', JSON.stringify(users));        
        loggedInUser={name:action.payload.name,
        email:action.payload.email}
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        sessionStorage.setItem('isLoggedIn','true');    
          return {
              ...state,
              loggedInUser:{name:action.payload.name,
                            email:action.payload.email},
              isLoggedIn:true,
              users:users
          }

          case GET_USERS :         
               users= localStorage.getItem('users');
                if(users==null){
                    users=[];
                    localStorage.setItem('users', JSON.stringify(users));                
                }
                else{
                    users=JSON.parse(localStorage.getItem('users'))
                }

                let isLoggedIn= sessionStorage.getItem('isLoggedIn');
                if(isLoggedIn==null)
                {sessionStorage.setItem('isLoggedIn', 'false');
                loggedInUser={}
                sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                }
                else{
                  if(isLoggedIn=='false'){
                loggedInUser={}
                sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                  }
                  else{
                 loggedInUser=JSON.parse(sessionStorage.getItem('loggedInUser'));
                 islogged=true
                  }
                }
                
                
            return {
                ...state,
                users:users,
                loggedInUser:loggedInUser,
                isLoggedIn:islogged

            } 

         case SIGN_IN :  
         loggedInUser={name:action.payload.name,
            email:action.payload.email};
          sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
          sessionStorage.setItem('isLoggedIn','true');      
                     
         return {
             ...state,
             loggedInUser:loggedInUser,
             isLoggedIn:true
             
         }     
        default :
        return state;

    }
}