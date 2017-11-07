//Actions
import * as types from './ActionTypes'
//Fake API
import * as TableApi from '../utils/api/TableAPI.dev';
const _ = require('lodash');

//TODO: Add isOpen set to false for all rows on initial data load
export const fetchData = ({ width }) => async dispatch => {
    try {
        let rowPayload = await TableApi.generateFakeData();
        let columnPayload = await TableApi.getColumns();

        dispatch(fetchDataSuccess({ rows: rowPayload, columns: columnPayload }));
        dispatch(calculateRows())
        dispatch(resizeTable({ width }))
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
const length = (x) => x.length
const sum = (a, b) => a+b
const indexesOf = (substr) => ({
  in: (str) => (
    str
    .split(substr)
    .slice(0, -1)
    .map(length)
    .map((_, i, lengths) => (
      lengths
      .slice(0, i+1)
      .reduce(sum, i*substr.length)
    ))
  )
});
const insert = (str, index, value) => {
    return str.substr(0, index) + value + str.substr(index);
}

export const searchRows = ({ searchString }) => (dispatch, getState) => {
    const state = getState();
    let rows = _.cloneDeep(state.table.rows.initial);
    let flag, indexes;
    const upperCaseSearchString = searchString.toUpperCase();

    rows = rows.filter( row => {
        flag = false;
        Object.entries(row).forEach(([key, value]) => {
            let rowValue = value;
            const currentCell = (typeof rowValue === 'string') ? rowValue.toUpperCase() : rowValue.toString().toUpperCase();
            indexes = indexesOf(upperCaseSearchString).in(currentCell);
            if( indexes.length > 0){
              rowValue = value;
              flag = true;
              for(let i = indexes.length -1; i >= 0; i--){
                rowValue = insert(rowValue, indexes[i] + searchString.length, '</span>')
                rowValue = insert(rowValue, indexes[i], '<span class="highlight">')
              }
              row[key] = rowValue;
            }
        })
        return flag ? row : false;
    });

    dispatch(updateGlobalSearchString({ value: searchString }));
    dispatch(changePageSuccess({ currentPage: 1 }));
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
    dispatch(changePageSuccess({ currentPage: 1 }));
    dispatch(calculateRows());
};

export const clearSearchSuccess = () => {
    return { type: types.CLEAR_SEARCH };
};

export const resizeTable = ({ width }) => (dispatch, getState) => {
    const state = getState();
    const { table: { columns: { visible } } } = state;
    let visibleColumns = Object.assign([], visible);

    let visibleColumnsWidth = 0;
    visibleColumns.map(column => visibleColumnsWidth += column.minWidth);

    visibleColumnsWidth > width ?
        dispatch(tryToRemoveColumns({ visibleColumnsWidth, width })) :
         dispatch(tryToAddColumns({ visibleColumnsWidth, width }))
};

export const tryToRemoveColumns = ({ visibleColumnsWidth, width }) => (dispatch, getState) => {
    const state = getState();
    const { table: { columns: { visible } } } = state;
    let visibleColumns = Object.assign([], visible);
    visibleColumns.sort(dynamicSort({column: 'priorityLevel'}));

    while(visibleColumnsWidth > width && visibleColumns.length !== 0){
        visibleColumnsWidth -= visibleColumns.pop().minWidth;
        dispatch(removeColumn())
    }
};
export const tryToAddColumns = ({ visibleColumnsWidth, width }) => (dispatch, getState) => {
    const state = getState();
    const { table: { columns: { hidden } } } = state;
    let hiddenColumns = Object.assign([], hidden);
    hiddenColumns.sort(dynamicSort({column: 'priorityLevel'}));

    while(visibleColumnsWidth < width && hiddenColumns.length !== 0){
        visibleColumnsWidth += hiddenColumns.shift().minWidth;
        if(visibleColumnsWidth < width && hiddenColumns.length === 0) {
          dispatch(addColumn());
          dispatch(closeAllRows());
        } else if (visibleColumnsWidth < width){
            dispatch(addColumn())
        }
    }
};

export const closeAllRows = () => (dispatch, getState) => {
  const state = getState();
  const { table: { rows: { displayed } } } = state;
  const rowsDisplayed = displayed.map(row => { return { ...row, isOpen: false } })
  dispatch(closeAllRowsSuccess({ rowsDisplayed }));
};

export const closeAllRowsSuccess = ({ rowsDisplayed }) => {
  return { type: types.CLOSED_ALL_ROWS, rowsDisplayed }
};

export const removeColumn = () => (dispatch, getState) => {
    const state = getState();
    const { table: { columns: { visible, hidden } } } = state;
    let visibleColumns = Object.assign([], visible);
    let hiddenColumns = Object.assign([], hidden);

    if(visibleColumns.length !== 0) {
        visibleColumns.sort(dynamicSort({column: 'priorityLevel'}));
        hiddenColumns.push(visibleColumns.pop());
        visibleColumns.sort(dynamicSort({column: 'position'}));
        hiddenColumns.sort(dynamicSort({column: 'position'}));
    }
    dispatch(resizeTableSuccess({ visible: visibleColumns, hidden: hiddenColumns }));
};

export const addColumn = () => (dispatch, getState) => {
    const state = getState();
    const { table: { columns: { visible, hidden } } } = state;
    let visibleColumns = Object.assign([], visible);
    let hiddenColumns = Object.assign([], hidden);

    if(hiddenColumns.length !== 0) {
        hiddenColumns.sort(dynamicSort({column: 'priorityLevel'}));
        visibleColumns.push(hiddenColumns.shift());
        visibleColumns.sort(dynamicSort({column: 'position'}));
        hiddenColumns.sort(dynamicSort({column: 'position'}));
    }
    dispatch(resizeTableSuccess({ visible: visibleColumns, hidden: hiddenColumns }));
};

export const resizeTableSuccess = ({ visible, hidden }) => {
    return { type: types.RESIZED_TABLE, visible, hidden };
};
