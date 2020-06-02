import React, { useEffect } from 'react';
//import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null) {
    //App.js에서 component페이지들을 auth로 감싸주어 그 페이지를 품는다.
    // null : 아무나 출입가능한 페이지
    // true : 로그인한 유저만 출입 가능한 페이지
    // false : 로그인 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props) {
        
        const dispatch = useDispatch();
        useEffect(() => {
            
            dispatch(auth()).then(response => {
                console.log(response);
                //db로부터 받은 정보를 response에..
                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

            //Axios.get('/api/users/auth')
        }, [])
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck;
}