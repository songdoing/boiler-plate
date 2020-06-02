import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
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

//auth
export function auth() {
    //auth를 통해 db에 request를 보내서 현재user의 상태를 가져오도록..
    const request =  axios.get('/api/users/auth')
    .then(response =>  response.data )
    
    //reducer에게 넘겨준다
    return {
        type : AUTH_USER,
        payload : request
    }

}