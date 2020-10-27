import React, { useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";
import { withRouter } from "react-router-dom"

function LoginPage(props) {

    const dispatch = useDispatch(); // 'react-redux'의 내장함수 (Action 기능)

    const [Email, setEmail] = useState("")     // email value에 집어넣을 state / initialState는 초기값
    const [Password, setPassword] = useState("")  // password value에 집어넣을 state

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)  // email의 state를 바꿔주는 기능
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // 기존의 submit이 가지고 있는 기능(페이지 새로고침)을 차단해줌

        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body)) // dispatch를 이용해 action(loginUser)을 취함 -> /_action/user_action.js로 전달
            .then(response => {
                if(response.payload.loginSuccess) {   // 로그인 성공시
                    props.history.push('/')   // 리액트에서 페이지 이동시키는 방법
                }else{   // 로그인 실패시
                    alert('Error"')
                }
            })
    }


    return (
        <div style={{ display: 'flex' , justifyContent : 'center' , alignItems : 'center'
            , width : '100%' , height : '100vh'
        }} >

            <form style={{ display: 'flex' , flexDirection : 'column' }}
            onSubmit={onSubmitHandler} // button을 눌렀을 때 기능을 주기위해
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} /> 
                // onChange는 input에 값을 입력할 수 있게 해줌
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">Login</button>
            </form>


        </div>
    )
}

export default withRouter(LoginPage)