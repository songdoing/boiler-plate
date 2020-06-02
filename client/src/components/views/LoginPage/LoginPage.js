import React, { useState } from 'react'
//import Axios from 'axios'
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action' 
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {

        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onClickStart = () => {
        props.history.push('/')
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        //state안의 상태. 브라우저에 입력한 것을 넣어진다
        console.log('Email', Email)
        console.log('Password', Password)

        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('./') 
                    //history.push 보내준다 react-router-dom의 withRouter를 써야함.
                } else {
                    alert('Error');
                }
            })
       
    }

    return (
        <div style={{display :'flex', justifyContent : 'center', alignItems : 'center',
            width : '100%', height : '100vh' 
        }}>
            <form style={{ display : 'flex', flexDirection : 'column'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />  
                <br/>
                <button type="submit"> Login </button>  
                <br/>
                <button onClick= {onClickStart}>Start Page</button> 
            </form>
                    
        </div>
    )
}

export default withRouter(LoginPage)
