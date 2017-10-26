//Actions
import * as types from '../actions/ActionTypes';
//Initial Data
import initialState from '../store/initialState';

export default function TableReducer(state = initialState.table, action) {
    switch (action.type) {
        case types.FETCHED_DATA_SUCCESS:
            return { ...state, allRows: action.allRows };
        case types.ROW_ORDER_CHANGED:
            return { ...state, allRows: action.allRows };
        case types.CALCULATED_ROWS_FINISHED:
            return { ...state, displayedRows: action.displayedRows };
        case types.CHANGE_CURRENT_PAGE:
            return { ...state, currentPageNumber: action.currentPageNumber };
        case types.SORT_COLUMN_AND_DIRECTION_UPDATED:
            return { ...state, sort: { ...state.sort, column: action.column, direction: action.direction } };
        default:
            return { ...state };
    }
}
