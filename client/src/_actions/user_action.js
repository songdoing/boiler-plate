import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request =  axios.post('/api/users/login', dataToSubmit)
    .then(response =>  response.data )
    
    //reducer에게 넘겨준다
    return {
        type : LOGIN_USER,
        payload : request
    }

}

//register
export function registerUser(dataToSubmit) {
    const request =  axios.post('/api/users/register', dataToSubmit)
    .then(response =>  response.data )
    
    //reducer에게 넘겨준다
    return {
        type : REGISTER_USER,
        payload : request
    }

}