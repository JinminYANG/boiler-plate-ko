import React from 'react';
import './App.css';
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"; // 페이지 라우팅을 위해 가져옴
import LandingPage from "./components/views/LandingPage/LandingPage";    // 페이지 라우팅을 위해 가져옴
import LoginPage from "./components/views/LoginPage/LoginPage";          // 페이지 라우팅을 위해 가져옴
import RegisterPage from "./components/views/RegisterPage/RegisterPage"; // 페이지 라우팅을 위해 가져옴
import Auth from './hoc/auth';

function App() {
    return (
        <Router>
        <div>
            {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
            <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)}/>
                //path는 이동되는 페이지를 말함 (주소창)
                <Route exact path="/login" component={Auth(LoginPage, false)}/>

                <Route exact path="/register" component={Auth(RegisterPage, false)}/>
            </Switch>
        </div>
    </Router>
    );
}

export default App;
