import { AsyncStorage } from 'react-native';
import {
    REGISTER_SUCCES,
    REGISTER_FAIL,
    LOGIN_SUCCES,
    LOGIN_FAIL,
    USER_LOADED,
    LOGOUT
} from '../types';
export default (state,action)=>{
    switch(action.type){
        case REGISTER_SUCCES:
        case LOGIN_SUCCES:
            
            return {...state,
            token:action.payload,
            error:null,
            isAuthenticated:true}
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {...state,
            token:null,
            isAuthenticated:false,
            user:null,
            error:action.payload 
            }
        case USER_LOADED:
            return{...state,
                user:action.payload
            }
        case LOGOUT:
            return{...state,
                token:null,
                isAuthenticated:false,
                user:null
            }
    }
}