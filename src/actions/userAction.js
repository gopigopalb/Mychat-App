import axios from "axios";
import{
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_LOADING,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    USERLIST_LOADING,
    USERLIST_SUCCESS,
    USERLIST_FAILURE,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAILURE
} from '../actions/constants';
import { SERVERURL } from '../../config';
//import AsyncStorage from '@react-native-community/async-storage';

export function loginLOADING() {
    return{
        type: LOGIN_LOADING,
    };
}
export function loginSUCCESS(payload) {
    return{
        type: LOGIN_SUCCESS,
        payload: payload
    };
}
export function loginFAILURE(payload) {
    return{
        type: LOGIN_FAILURE,
        payload: payload
    };
}
export function userLogin(userinfo) {
    const data = userinfo;
  //  console.log(data,"login")
    return (dispatch) => {
        dispatch(loginLOADING());
        axios({
            method:"POST",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            url: `${SERVERURL}loginuser`,
            crossDomain:true,
            data,
        }).then((res) => {
            if (res.status === 200) {
                // const usercredentials = JSON.stringify(res.data);
                // AsyncStorage.setItem('usercredentials',usercredentials);
                dispatch(loginSUCCESS(res.data));
            }
        }).catch((error) => {
            if(error.response) {
                dispatch(loginFAILURE(error.response));
            }
        });
    };
}

export function registerLOADING() {
    return{
        type: REGISTER_LOADING,
    };
}
export function registerSUCCESS(payload) {
    return{
        type: REGISTER_SUCCESS,
        payload: payload
    };
}
export function registerFAILURE(payload) {
    return{
        type: REGISTER_FAILURE,
        payload: payload
    };
}
export function userRegister(userinfo) {
    const data = userinfo;
  //  console.log(data,"data")
    return (dispatch) => {
        dispatch(registerLOADING());
        axios({
            method:"POST",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            url: `${SERVERURL}registeruser`,
            crossDomain:true,
            data,
        }).then((res) => {
            if (res.status === 200) {
                // const usercredentials = JSON.stringify(res.data);
                // AsyncStorage.setItem('usercredentials',usercredentials);
                dispatch(registerSUCCESS(res.data));
            }
        }).catch((error) => {
            if(error.response) {
                dispatch(registerFAILURE(error.response));
            }
        });
    };
}

export function userListLOADING() {
    return{
        type: USERLIST_LOADING,
    };
}
export function userListSUCCESS(payload) {
    return{
        type: USERLIST_SUCCESS,
        payload: payload
    };
}
export function userListFAILURE(payload) {
    return{
        type: USERLIST_FAILURE,
        payload: payload
    };
}
export function userList(userinfo) {
    return (dispatch) => {
        dispatch(userListLOADING());
        axios({
            method:"GET",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            url: `${SERVERURL}userslist`,
            crossDomain:true,
        }).then((res) => {
            if (res.status === 200) {
                dispatch(userListSUCCESS(res.data));
            }
        }).catch((error) => {
            if(error.response) {
                dispatch(userListFAILURE(error.response));
            }
        });
    };
}

// export function userAuthSuccess(payload) {
//     return {
//         type: USER_AUTH_SUCCESS,
//         payload: payload
//     };
// }

// export function userAuthFailure(error) {
//     return{
//         type: USER_AUTH_FAILURE,
//         payload: error
//     };
// }

// export function userAuth() {
//     return async function (dispatch) {
//         try {
//             AsyncStorage.getItem('usercredentials')
//             .then((value) => {
//                 const res = JSON.parse(value);
//                 dispatch(userAuthSuccess(res));
//             });
//         } catch(error) {
//             dispatch(userAuthFailure(error))
//         }
//     }
// }