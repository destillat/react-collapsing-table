//Actions
import * as types from '../actions/ActionTypes';
//Initial Data
import initialState from '../store/initialState';

export default function TableReducer(state = initialState.table, action) {
    switch (action.type) {
        case types.FETCHED_DATA_SUCCESS:
            return { ...state, data: action.data };
        default:
            return { ...state };
    }
}
