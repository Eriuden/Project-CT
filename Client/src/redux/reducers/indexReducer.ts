import { combineReducers } from "@reduxjs/toolkit";
import { allUsersReducer } from "./allUsersReducer";
import { userReducer } from "./userReducer";
import { errorReducer } from "./errorReducer";
import { monthlySnapshotReducer } from "./monsthlySnapshot.reducer";
import { allmonthlySnapshotReducer } from "./allMonsthlySnapshot.reducer";
import { transactionReducer } from "./transaction.reducer";
import { allTransactionReducer } from "./allTransactionReducer";

export const reducers = combineReducers({
    userReducer,
    allUsersReducer,
    errorReducer,
    monthlySnapshotReducer,
    allmonthlySnapshotReducer,
    transactionReducer,
    allTransactionReducer
})