import React, {useEffect} from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom"

function LandingPage(props) {

    useEffect(() => {  // class component에서 데이터를 가져오거나 하는 componentDidMount()와 같은 기능 (라이프사이클이라고 함)
        axios.get('/api/hello') // 이거를 서버로 보냄
            .then(response => console.log(response.data)) // 서버에서 콜백받은 데이터를 처리
    }, [])

    const onClickHandler = () => { // 로그아웃 버튼을 클릭했을 때의 기능
        axios.get('/api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login")    // history는 react-router-dom을 이용해서 쓰는거
                }else{
                    alert("로그아웃 하는게 실패 했습니다.")
                }
            })
    }

    return (<div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>로그아웃</button>
        </div>)
}

export default withRouter(LandingPage) // props.history를 이용하려면 이렇게 써야함