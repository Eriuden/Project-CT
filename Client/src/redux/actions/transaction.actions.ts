import axios from "axios"

export type TransactionType = "income" | "expense";

export interface Transaction {
  _id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
  recurrenceType: "monthly" | "yearly" | null;
  description?: string;
}

export const GET_TRANSACTION = "GET_TRANSACTION"
export const GET_ALL_TRANSACTION = "GET_ALL_TRANSACTION"

export const getTransaction = async (num: number, dispatch: any): Promise<Transaction[]> => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}api/transaction`)
    .then((res:any)=> {
        dispatch ({type: GET_TRANSACTION, payload: num})
        dispatch({type:GET_ALL_TRANSACTION, payload: res.data})
    })
    .catch((err:any) => window.alert(err))
}

export const createTransactionAPI = async (
  data: Partial<Transaction>
): Promise<Transaction> => {
  const res = await axios.post(API_URL, data, {
    withCredentials: true,
  });
  return res.data;
};

// UPDATE
export const updateTransactionAPI = async (
  id: string,
  data: Partial<Transaction>
): Promise<Transaction> => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

// DELETE
export const deleteTransactionAPI = async (
  id: string
): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
};