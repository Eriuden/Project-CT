import { GET_ALL_TRANSACTION } from "../actions/transaction.actions"

const initialState = {}

export const allTransactionReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case GET_ALL_TRANSACTION:
            return action.payload
        default:
            return state
    }
}