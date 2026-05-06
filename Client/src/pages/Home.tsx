import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { UidContext } from "../components/appContext"
import { useContext } from 'react'
import { isEmpty } from '../Utils'
import { AddTransactionForm } from "../components/addTransactionForm"
import { Connexion } from "../components/ConnexionModal"
import { getTransaction } from "../redux/actions/transaction.actions"
import DashboardHome from "../components/dashboard/dashBoardHome"

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

export const Home = () => {

    type appDispatch = () => any 
    const useAppDispatch = () => useDispatch<appDispatch>()
    const dispatch = useAppDispatch()

    const [showTransaction, setShowTransaction] = useState(false)
    const [showDashBoard, setShowDashboard] = useState(false)

    const uid = useContext(UidContext)
    const transactions = useSelector((state:any) => state.transactionReducer)

    useEffect(()=> {
        dispatch(getTransaction)
    }, [dispatch])

    let balance = 0;

    transactions.forEach((transaction: transactionProps) => {
        if (transaction.type === "income") {
            balance += transaction.amount;
        } else {
            balance -= transaction.amount;
        }
    });


    return (
        <div>
            {uid ? (
                <>
                    <section>
                        <h1>Solde actuel</h1>
                        <h2>{balance >= 0 ? "+" : "-"}{balance}€</h2>
                        <p>Votre trésorerie est {balance >= 0 ? "excédentaire" : "déficitaire"}</p>
                    </section>
                    <button onClick={ () => setShowTransaction(!showTransaction)}/>
                    <button onClick={ () => setShowDashboard(!showDashBoard)}/>
                    <AddTransactionForm />

                    {showTransaction ? 
                        <ul>
                            {!isEmpty(transactions) &&
                                transactions.map((transaction:transactionProps) => {
                                    return (
                                        <>
                                            <li>{transaction.amount}</li>
                                            <li>{transaction.type}</li>
                                            <li>{transaction.category}</li>
                                            <li>{new Date(transaction.date).toLocaleString()}</li>
                                            <li>{transaction.recurrrenceType}</li>
                                            <li>{transaction.description}</li>
                                        </>                                   
                                    )
                                }
                            )}
                        </ul>
                        : "" 
                    }

                    {showDashBoard ? <DashboardHome/> : ""}
                </>
            ) : (
                <Connexion/>
            )}
        </div>
    )
}
