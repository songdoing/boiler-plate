import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => { console.log(response) })
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            console.log(response.data)
            if(response.data.success) {
                props.history.push("/login");
            } else {
                alert('Failed to logout.')
            }
        })
    }

    const onClickLogin = () => {
        props.history.push("/login");
    }

    const onClickRegister = () => {
        props.history.push("/register");
    }

    return (
        <div style={{display :'flex', justifyContent : 'center', flexDirection : 'column', alignItems : 'center',
            width : '100%', height : '100vh' 
        }}>
           <h2>start page</h2> <br/>
           <button onClick= {onClickHandler}>Log Out</button><br/>
           <button onClick= {onClickLogin}>Log In</button><br/>
           <button onClick= {onClickRegister}>Register</button>
        </div>
    )
}

export default withRouter(LandingPage)
