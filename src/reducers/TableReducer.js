//Actions
import * as types from '../actions/ActionTypes';
//Initial Data
import initialState from '../store/initialState';

export default function TableReducer(state = initialState.table, action) {
    switch (action.type) {
        case types.FETCHED_DATA_SUCCESS:
            return { ...state, allRows: action.allRows, initialRows: action.allRows };
        case types.ROW_ORDER_CHANGED:
            return { ...state, allRows: action.allRows };
        case types.CALCULATED_ROWS_FINISHED:
            return { ...state, displayedRows: action.displayedRows };
        case types.CHANGE_CURRENT_PAGE:
            return { ...state, currentPageNumber: action.currentPageNumber };
        case types.SORT_COLUMN_AND_DIRECTION_UPDATED:
            return { ...state, sort: { ...state.sort, column: action.column, direction: action.direction } };
        case types.EXPAND_ROW:
            return {
                ...state,
                displayedRows: state.displayedRows.map(
                    (row, index) => action.rowIndex === index ?
                        { ...row, isOpen: !row.isOpen} : row),
            };
        case types.FILTERED_TABLE:
            return { ...state, allRows: action.allRows };
        case types.CLEAR_SEARCH:
            return { ...state, allRows: state.initialRows };
        default:
            return { ...state };
    }
}
