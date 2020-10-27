import {LOGIN_USER , REGISTER_USER, AUTH_USER} from './types';
import Axios from "axios";

export function loginUser(dataToSubmit) { // 이메일과 비밀번호를 파라미터(dataToSubmit)를 통해 전달받음

    const request = Axios.post('/api/users/login', dataToSubmit) // 서버에 request(요청)를 날림
        .then(response => response.data) // requset에 서버(백엔드)에서 받은 response(응답).data를 저장

    return { // reducer로 보내는 작업
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = Axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}


export function auth() {

    const request = Axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}
