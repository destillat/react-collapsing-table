//Actions
import * as types from './ActionTypes'
//Fake API
import * as TableApi from '../utils/api/TableAPI.dev';

//TODO: Add isOpen set to false for all rows on initial data load
export const fetchData = () => async dispatch => {
    try {
        let rowPayload = await TableApi.generateFakeData();
        let columnPayload = await TableApi.getColumns();

        dispatch(fetchDataSuccess({ rows: rowPayload, columns: columnPayload }));
        dispatch(calculateRows())
    } catch (error) {
        console.log(error);
    }
};

export const fetchDataSuccess = ({ rows, columns }) => {
    return { type: types.FETCHED_DATA_SUCCESS, rows, columns }
};

export const calculateRows = () => (dispatch, getState) => {
    let selectedRows = [];
    const state = getState();
    const {
        table: {
            rows: { filtered },
            pagination: { currentPage, rowSize }
        }
     } = state;

    //pagination
    if( filtered.length > 0 ) {
        const startingPoint = ((currentPage - 1) * rowSize);
        const endingPoint = startingPoint + rowSize;
        selectedRows = filtered.slice(startingPoint, endingPoint);
    }

    //create empty rows
    //Set as a const so it is not re-evaluated after each loop
    const selectedRowsLength = selectedRows.length;
    for(let i = 0; i < (rowSize - selectedRowsLength); i++){
        selectedRows.push({});
    }

    dispatch(calculateRowsSuccess({ visibleRows: selectedRows }))
};

export const calculateRowsSuccess = ({ visibleRows }) => {
    return { type: types.CALCULATED_ROWS_FINISHED, visibleRows }
};

export const nextPage = () => (dispatch, getState) => {
    const state = getState();
    const { table: { pagination: { currentPage } } } = state;

    dispatch(changePageSuccess({ currentPage: currentPage + 1 }));
    dispatch(calculateRows());
};

export const previousPage = () => (dispatch, getState) => {
    const state = getState();
    const { table: { pagination: { currentPage } } } = state;

    dispatch(changePageSuccess({ currentPage: currentPage - 1 }));
    dispatch(calculateRows());
};

export const changePageSuccess = ({ currentPage }) => {
    return { type: types.CHANGE_CURRENT_PAGE, currentPage }
};

export const sortColumn = ({ column }) => dispatch => {
    dispatch(changeSortFieldAndDirection({ newColumn: column }));
    dispatch(changeRowOrder({ column }));
};

export const changeSortFieldAndDirection = ({ newColumn }) => (dispatch, getState) => {
    let newDirection;
    const state = getState();
    const { table: { sort: { column, direction } } } = state;


    if(column === newColumn) {
        switch (direction) {
            case 'none':
                newDirection = 'ascending';
                break;
            case 'ascending':
                newDirection = 'descending';
                break;
            case 'descending':
                newDirection = 'none';
                break;
            default:
                newDirection = 'none';
                break;
        }
    } else {
        newDirection = 'ascending';
    }

    dispatch(changeSortColumnAndDirectionSuccess({ column: newColumn, direction: newDirection }))
};

export const changeRowOrder = ({ column }) => (dispatch, getState) => {
    const state = getState();

    // TODO: search columns for priority level 1 as deafult search field
    const { table: { sort: { direction }, rows: { filtered } } } = state;
    let sortedRows = [];

    switch (direction) {
        case 'ascending':
            sortedRows = filtered.sort(dynamicSort({ column }));
            break;
        case 'descending':
            sortedRows = filtered.sort(dynamicSort({ column })).reverse();
            break;
        case 'none':
            // TODO: added in priority level to figure out the default search field
            // newRows = allRows.sort(dynamicSort({ column: 'firstName'}));
            sortedRows = filtered.sort(dynamicSort({ column }));
            break;
        default:
            sortedRows = filtered.sort(dynamicSort({ column }));
    }

    dispatch(rowsSorted({ rows: sortedRows }));
    dispatch(calculateRows());
};

export const rowsSorted = ({ rows }) => {
    return { type: types.ROWS_SORTED, rows };
};

export const changeSortColumnAndDirectionSuccess = ({ column, direction }) => {
    return { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column, direction };
};

export const dynamicSort = ({ column }) => {
    // TODO: Figure out how to tell if date
    // return (a, b) => (new Date(b[property]).getTime() - new Date(a[property]).getTime());
    return (a, b) => ((a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0);
};

export const expandRow = ({ rowIndex }) => {
    return { type: types.EXPAND_ROW, rowIndex };
};

export const searchRows = ({ searchString }) => (dispatch, getState) => {
    const state = getState();
    let rows = state.table.rows.initial;
    let flag;
    const upperCaseSearchString = searchString.toUpperCase();

    rows = rows.filter( row => {
        for (let rowValue of Object.values(row)) {
            const currentCell = (typeof rowValue === 'string') ? rowValue.toUpperCase() : rowValue.toString().toUpperCase();
            flag = currentCell.includes(upperCaseSearchString);
            if(flag) break;
        }
        return flag ? row : false;
    });

    dispatch(updateGlobalSearchString({ value: searchString }))
    dispatch(searchRowsSuccess({ rows }));
    dispatch(calculateRows());
};

export const searchRowsSuccess = ({ rows }) => {
    return { type: types.FILTERED_TABLE, rows }
};

export const updateGlobalSearchString = ({ value }) => {
    return { type: types.SEARCH_STRING_UPDATED, value }
};

export const clearSearch = () => dispatch => {
    dispatch(clearSearchSuccess());
    dispatch(calculateRows());
};

export const clearSearchSuccess = () => {
    return { type: types.CLEAR_SEARCH }
};

export const resizeTable = () => (dispatch, getState) => {

};
