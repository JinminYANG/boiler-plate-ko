import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'; // redux에서 제공하는 것
import 'antd/dist/antd.css';
import {applyMiddleware, createStore} from "redux";
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
// 그냥 createStore를 생성하면 객체만 받을 수 있기 때문에
// Store에서 Promise 형식과 Functions 형식을 받기 위한 선언

ReactDOM.render(
    <Provider // 이렇게 감싸면 redux랑 어플리케이션이랑 연결 시켜주는 작업
        store={ createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&    // 브라우저에서 redux extension을 사용하려고 다운받아 연결 해주는거
            window.__REDUX_DEVTOOLS_EXTENSION__()
            )}
    >
        <App /> // App.js의 App 컴포넌트가 여기에 들어간거 (index 페이지에서 보여주고 싶은 컴포넌트를 삽입하면 됨)
    </Provider>
    , document.getElementById('root'));  // index.html에서 id=root element를 id로 잡은 다음에 index.html에 root라는 아이디를 가지고 있는 곳에 위의 내용을 보여줄거라고 정의를 해주는거임

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

