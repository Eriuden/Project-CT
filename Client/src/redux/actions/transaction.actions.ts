import axios from "axios"

export type TransactionType = "income" | "expense";
export type RecurrenceType = "monthly" | "yearly" | null

export interface Transaction {
  _id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
  recurrenceType: RecurrenceType
  description?: string;
}

export const GET_TRANSACTION = "GET_TRANSACTION"
export const GET_ALL_TRANSACTION = "GET_ALL_TRANSACTION"
export const ADD_TRANSACTION = "ADD_TRANSACTION"
export const GET_TRANSACTION_ERROR = "GET_TRANSACTION_ERROR"
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION"

export const getTransaction = async (num: number, dispatch: any) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}api/transaction`)
    .then((res:any)=> {
        dispatch ({type: GET_TRANSACTION, payload: num})
        dispatch({type:GET_ALL_TRANSACTION, payload: res.data})
    })
    .catch((err:any) => window.alert(err))
}

export const addTransaction = (data: any, dispatch:any) => {
    return axios 
        .post(`${process.env.REACT_APP_API_URL}api/snpashot`, data)
        .then((res:any)=> {
            if (res.data.errors) {
                dispatch({type: GET_TRANSACTION_ERROR, payload: res.data.errors})
            } else {
                dispatch ({type: GET_TRANSACTION_ERROR, payload:""})
                dispatch ({type: ADD_TRANSACTION})
            }
        })
}

export const updateArticle = (
  transactionId: string,  
  type: TransactionType,
  category: string,
  amount: number,
  date: Date,
  recurring: boolean,
  recurrenceType: RecurrenceType,
  description?: string,
  dispatch:any
) => {
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/article/${transactionId}`,
            data: { type, category, amount, date, recurring, recurrenceType, description},
        })
        .then(()=> {
            dispatch({
                type: UPDATE_TRANSACTION,
                payload: {transactionId, type, category, amount, date, recurring, recurrenceType, description}
            })
        })
        .catch((err:any)=> window.alert(err))
}

// DELETE
export const deleteTransactionAPI = async (
  id: string
): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
};