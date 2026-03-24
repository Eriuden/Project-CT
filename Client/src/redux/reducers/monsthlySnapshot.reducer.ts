import { GET_SNASPHOT } from "../actions/monthlySnapshot.actions"

const initialState = {}

export const monthlySnapshotReducer = (state = initialState, action: any) => {
 switch (action.type) {
    case GET_SNASPHOT : return action.payload

    default: 
        return state
 }
}