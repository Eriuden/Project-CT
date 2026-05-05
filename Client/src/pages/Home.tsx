import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { UidContext } from "../components/appContext"
import { useContext } from 'react'
import { isEmpty } from '../components/Utils'
import { Connexion } from "../components/ConnexionModal"

export const Home = () => {
    type appDispatch = () => any 
    const uid = useContext(UidContext)
    return (
        <div>
            {uid ? (
                <>
                    <div className="preloader">
                      <h2>Veuillez patienter</h2>
                      <span className="loader"></span>
                    </div>
                </>
            ) : (
                <Connexion/>
            )}
        </div>
    )
}
