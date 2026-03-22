import axios from "axios"
const GET_ALL_SNAPSHOT ="GET_ALL_SNAPSHOT"
const GET_SNASPHOT = "GET_SNAPSHOT"

export const getAllSnapshots = (num:number, dispatch:any) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/snapshot`)
            .then((res:any)=> {
                dispatch ({type: GET_SNASPHOT, payload: num})
                dispatch({type:GET_ALL_SNAPSHOT, payload: res.data})
            })
            .catch((err:any) => window.alert(err))
}

export const getSnapshot = (snapshotId: string, dispatch:any) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/snapshot/:id`)
            .then(()=> {
                dispatch({type:GET_SNASPHOT, payload:snapshotId})
            })
            .catch((err:any)=> window.alert(err))
}