//Actions
import * as types from '../actions/ActionTypes';
//Initial Data
import initialState from '../store/initialState';

export default function TableReducer(state = initialState.table, action) {
    switch (action.type) {
        case types.FETCHED_DATA_SUCCESS:
            return { ...state, allRows: action.allRows };
        case types.SELECTED_ROW_SUCCESS:
            return { ...state, displayedRows: action.selectedRows };
        case types.CHANGE_CURRENT_PAGE:
            return { ...state, currentPageNumber: action.currentPageNumber }
        default:
            return { ...state };
    }
}
