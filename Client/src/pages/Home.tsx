import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { UidContext } from "../components/appContext"
import { useContext } from 'react'
import { isEmpty } from '../components/Utils'
import { Connexion } from "../components/ConnexionModal"
import { getAllSnapshots } from "../redux/actions/monthlySnapshot.actions"
import { getTransaction } from "../redux/actions/transaction.actions"

const transactionProps = {

}

export const Home = () => {

    type appDispatch = (transaction) => any 
    const useAppDispatch = () => useDispatch<appDispatch>()
    const dispatch = useAppDispatch()
    setTimeout(() => {
      const preloader = document.querySelector(".preloader") as HTMLElement
      preloader.style.display = "none";
    }, 10000);

    const uid = useContext(UidContext)
    const transaction = useSelector((state:any) => state.transactionReducer)

    useEffect(()=> {
        getTransaction(transaction.transactionId, dispatch)
    })

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
