import axios from "axios";

export const GET_USER = "GET_USER"
export const UPDATE_USER = "UPDATE_USER"
export const GET_USER_ERRORS = "GET_USER_ERRORS"
export const UPDATE_PASSWORD = "UPDATE_PASSWORD"
export const DELETE_USER = "DELETE_USER"

type userProps ={
    userId: string,
    name: string,
    email: string,
    password: string
}

export const getUser = (uid: string, dispatch:any) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res:any) => {
                dispatch({type: GET_USER, payload: res.data})
            })
            .catch((err:any) => window.alert(err))
}

export const updateUser = ({userId, name, email} : userProps, dispatch: any) => {   
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/user` + userId,
            data: {name, email}
        })
        .then(()=> {
            dispatch({type: UPDATE_USER, payload: name, email})
        })
}

export const updatePassword = (userId: string, password: string, dispatch:any) => {
        return axios({
            method:"put",
            url: `${process.env.REACT_APP_API_URL}api/user` + userId,
            data: {password}
        })
        .then(()=> {
            dispatch({type: UPDATE_PASSWORD, payload: password})
        })
        .catch((err:any)=> window.alert(err))
}

export const deleteUser = ({userId, name, email, password} : userProps, dispatch:any) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            data: {name, email, password}
        })
        .then(()=> {
            dispatch({type: DELETE_USER, payload: {userId}})
        })
}