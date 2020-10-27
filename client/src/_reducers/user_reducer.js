import {LOGIN_USER, REGISTER_USER, AUTH_USER} from "../_actions/types";

export default function (state = {}, action) { // reducer는 이전의 state와 현재의 state를 next state으로 만드는 것
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } // ...state(Spread Operator)는 state를 똑같이 복제하는 것 (빈 상태)
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;
        default:
            return state;

    }


}