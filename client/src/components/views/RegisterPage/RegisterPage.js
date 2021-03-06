import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action'; 
//import Axios from 'axios';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {

        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onClickStart = () => {
        props.history.push('/')
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        //state안의 상태. 브라우저에 입력한 것을 넣어진다
        console.log('Email', Email)
        console.log('Password', Password)

        //비번이랑 확인비번이랑 같아야 버튼클릭 할수 있다.
        if(Password !== ConfirmPassword) {
            return alert('Confirm password and password should be same.')
        }

        let body = {
            email : Email,
            name : Name,
            password : Password
        }
        //Axios.post('/api/users/register', body) 넣어 하는데 우린 리덕스를 써야하니..

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push("/login") 
                    //history.push 보내준다
                    alert ('Success to sign up. plz log in.')
                } else {
                    alert('Failed to sign up.');
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

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br/>
                <button type="submit"> SignUp </button>  
                <br/>
                <button onClick= {onClickStart}>Start Page</button> 
            </form>        
        </div>
    )
}

export default withRouter(RegisterPage)
