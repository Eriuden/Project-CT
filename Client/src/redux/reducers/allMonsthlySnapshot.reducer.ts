import { GET_ALL_SNAPSHOT } from "../actions/monthlySnapshot.actions"

const initialState = {}

export const allmonthlySnapshotReducer = (state = initialState, action: any) => {
 switch (action.type) {
    case GET_ALL_SNAPSHOT : return action.payload

    default: 
        return state
 }
}