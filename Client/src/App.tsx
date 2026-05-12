import { useEffect, useState } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Home } from './pages/Home'
import { getUser } from './redux/actions/user.actions'
import { ResetPassword } from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'

import './App.css'

function App() {
  type appDispatch = () => any
  
  const [uid, setUid] = useState("")
  const useAppDispatch = () => useDispatch<appDispatch>()
  const dispatch = useAppDispatch()

  useEffect(()=> {
    const fetchToken = async () => {
      await axios({
        method:"get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true
      })
      .then((res:any) => {
        console.log(res)
        setUid(res.data)
      })
      .catch(() => console.log("Pas de tokens"))
    }
    fetchToken()
    if (uid)
     getUser(uid, dispatch)
  }, [uid])

  return (
    <div>

    </div>
  )
}

export default App
