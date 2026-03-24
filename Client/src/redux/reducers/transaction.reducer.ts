import { DELETE_TRANSACTION, GET_TRANSACTION, UPDATE_TRANSACTION } from "../actions/transaction.actions";
   
   const initialState:any = {}
   
   export const transactionReducer = (state = initialState, action: any ) => {
       switch(action.type) {
           case GET_TRANSACTION:
               return action.payload
           case UPDATE_TRANSACTION:
               return state.map((transaction:any) => {
                   if (transaction.id === action.payload.transactionId) {
                       return {
                           ...transaction,
                           type: action.payload.type,
                           category: action.payload.category,
                           amount: action.payload.amount,
                           date: action.payload.date,
                           recurring: action.payload.recurring,
                           recurrencyType: action.payload.recurrenceType,
                           description: action.payload.description
                       }
                   } else return transaction
               })
           
           case DELETE_TRANSACTION:
               return state.filter((transaction:any) => 
               transaction.id !== action.payload.transactionId)
        }
   }