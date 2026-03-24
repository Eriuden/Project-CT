import { GET_TRANSACTION_ERROR } from "../actions/transaction.actions";
import { GET_USER_ERRORS } from "../actions/user.action";

const initialState = {userError : [], transactionError : []}

export const errorReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_TRANSACTION_ERROR:
            return {
                transactionError: action.payload
            }
        case GET_USER_ERRORS:
            return {
                userError: action.payload 
            }    
        default:
            return state
    }
}