import { combineReducers } from "redux";
import user from './user_reducer';
// import comment from './comment_reducer';


// store에 reducer가 여러가지 있을 수 있는데 reducer 안에서 하는일이 어떻게 state가 변하는 거를 보여준 다음에 변한 마지막 값을 리턴시켜주는게 reducer
const rootReducer = combineReducers({   // 여러가지 reducer를 Root Reducer를 이용해 하나로 합쳐주는게 combineReducers
   user

})

export default rootReducer;