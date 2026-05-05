import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { UidContext } from "../components/appContext"
import { useContext } from 'react'
import { isEmpty } from '../components/Utils'
import { Connexion } from "../components/ConnexionModal"
import { getTransaction } from "../redux/actions/transaction.actions"

export type TransactionType = "income" | "expense";
export type RecurrenceType = "monthly" | "yearly" | null;

type transactionProps = {
 transactionId : number,
 type: TransactionType,
 category : string,
 amount: number,
 date: Date,
 recuring: boolean
 recurrrenceType : RecurrenceType,
 description?: string
}

export const Home = (transaction: transactionProps) => {

    type appDispatch = () => any 
    const useAppDispatch = () => useDispatch<appDispatch>()
    const dispatch = useAppDispatch()
    setTimeout(() => {
      const preloader = document.querySelector(".preloader") as HTMLElement
      preloader.style.display = "none";
    }, 10000);

    const uid = useContext(UidContext)
    const transactions = useSelector((state:any) => state.transactionReducer)

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
                    <AddTransactionForm/>

                    <ul>
                        {!isEmpty(transaction) &&
                            transactions.map((transaction:transactionProps) => {
                                return (
                                    <>
                                        <li>{transaction.amount}</li>
                                        <li>{transaction.type}</li>
                                        <li>{transaction.category}</li>
                                        <li>{transaction.date}</li>
                                        <li>{transaction.recurrrenceType}</li>
                                        <li>{transaction.description}</li>
                                    </>                                   
                                )
                            })}
                    </ul>
                </>
            ) : (
                <Connexion/>
            )}
        </div>
    )
}
