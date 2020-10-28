import React, {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {

    // SpecificComponent : app.js - Auth(component)에서 component 부분

    // option 설명
    // null => 아무나 출입 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가한 페이지

    // adminRoute - 관리자만 들어가기를 원하는 페이지라면 true를 사용
    // 입력하지 않으면 그냥 null이 들어감 (ES6 문법)

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {   // 백엔드에서 처리해온 정보들이 response에 담겨있음
                console.log(response)

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){   // isAuth가 false일 때
                    if(option){   // 로그인 하지 않은 사람이 접근권한이 없는 페이지에 들어갈 때
                        props.history.push('/login')   // 못가게 막기 위해 로그인 페이지로 보내버린다.
                    }
                } else{
                    // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){  // admin만 들어갈 수 있는 페이지에 접근권한이 없는 사람이 들어가려 할 때
                        props.history.push('/') // 못들어가게 막는다.
                    }else{
                        if(option === false){  // 로그인한 유저가 불가능한 페이지 가려할때 (로그인/레지스터 페이지)
                            props.history.push('/')
                        }
                    }

                }

            });
        }, [])

        return (
            <SpecificComponent/>
        )
    }


    return AuthenticationCheck
}