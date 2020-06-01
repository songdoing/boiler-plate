import {
    LOGIN_USER
} from '../_actions/types';

export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER :
            return { ...state, loginSuccess : action.payload} 
            //user_action파일의 request하여 백엔드(index.js)로부터 가져온 data를 reducer에게 보내줌
           

        default :
            return state;    
    }
}