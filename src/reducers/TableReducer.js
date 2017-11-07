//Actions
import * as types from '../actions/ActionTypes';
//Initial Data
import initialState from '../store/initialState';

export default function TableReducer(state = initialState.table, action) {
    switch (action.type) {
        case types.FETCHED_DATA_SUCCESS:
            return {
                ...state,
                rows: {
                    ...state.rows,
                    initial: action.rows,
                    filtered: action.rows,
                },
                columns: {
                    ...state.columns,
                    initial: action.columns,
                    visible: action.columns,
                },
            };
        case types.ROWS_SORTED:
            return { ...state, rows: { ...state.rows, filtered: action.rows, }, };
        case types.CALCULATED_ROWS_FINISHED:
            return {
                ...state,
                rows: { ...state.rows, displayed: action.visibleRows },
            };
        case types.CHANGE_CURRENT_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.currentPage
                }
            };
        case types.SORT_COLUMN_AND_DIRECTION_UPDATED:
            return { ...state, sort: { ...state.sort, column: action.column, direction: action.direction } };
        case types.EXPAND_ROW:
            return {
                ...state,
                rows: {
                    ...state.rows,
                    displayed: state.rows.displayed.map(
                        (row, index) => action.rowIndex === index ?
                            { ...row, isOpen: !row.isOpen } : row), }
            };
        case types.FILTERED_TABLE:
            return { ...state, rows: { ...state.rows, filtered: action.rows, }, };
        case types.SEARCH_STRING_UPDATED:
            return { ...state, globalSearchString: action.value };
        case types.CLEAR_SEARCH:
            return {
                ...state,
                rows: { ...state.rows, filtered: state.rows.initial },
                globalSearchString: ''
            };
        case types.RESIZED_TABLE:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    hidden: action.hidden,
                    visible: action.visible,
                }
            };
        case types.CLOSED_ALL_ROWS:
              return { ...state, rows: { ...state.rows, displayed: action.rowsDisplayed } };
        default:
            return { ...state };
    }
}
