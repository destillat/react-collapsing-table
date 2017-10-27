//Actions
import * as types from './ActionTypes'
//Fake API
import * as TableApi from '../utils/api/TableAPI.dev';

//TODO: Add isOpen set to false for all rows on initial data load
export const fetchData = () => async dispatch => {
  try {
      let payload = await TableApi.generateFakeData();

      dispatch(fetchDataSuccess({ allRows: payload }))
      dispatch(calculateRows())
  } catch (error) {
      console.log(error);
  }
};

export const fetchDataSuccess = ({ allRows }) => {
    return { type: types.FETCHED_DATA_SUCCESS, allRows }
};

export const calculateRows = () => (dispatch, getState) => {
    let selectedRows = [];
    const state = getState();
    const { table, table: { allRows, rowSize, currentPageNumber } } = state

    //pagination
    if( allRows.length > 0 ) {
        const startingPoint = ((currentPageNumber - 1) * rowSize);
        const endingPoint = startingPoint + rowSize;
        selectedRows = allRows.slice(startingPoint, endingPoint);
    }

    //create empty rows
    //Set as a const so it is not re-evaluated after each loop
    const selectedRowsLength = selectedRows.length;
    for(let i = 0; i < (rowSize - selectedRowsLength); i++){
        selectedRows.push({});
    }

    dispatch(calculateRowsSuccess({ displayedRows: selectedRows }))
};

export const calculateRowsSuccess = ({ displayedRows }) => {
    return { type: types.CALCULATED_ROWS_FINISHED, displayedRows }
};

//TODO: Stop users from going to a totally blank page (to high)
export const nextPage = () => (dispatch, getState) => {
    const state = getState();
    const { table: { allRows, currentPageNumber, rowSize } } = state;

    dispatch(changePageSuccess({ currentPageNumber: currentPageNumber + 1 }));
    dispatch(calculateRows())
};

//TODO: Stop users from going to a totally blank page (to low)
export const previousPage = () => (dispatch, getState) => {
    const state = getState();

    const { table: { currentPageNumber } } = state;

    dispatch(changePageSuccess({ currentPageNumber: currentPageNumber - 1 }));
    dispatch(calculateRows())
};

export const changePageSuccess = ({ currentPageNumber }) => {
    return { type: types.CHANGE_CURRENT_PAGE, currentPageNumber }
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
    const { table: { sort: { direction }, allRows, columns } } = state;
    let newAllRows = [];

    switch (direction) {
        case 'ascending':
            newAllRows = allRows.sort(dynamicSort({ column }));
            break;
        case 'descending':
            newAllRows = allRows.sort(dynamicSort({ column })).reverse();
            break;
        case 'none':
            // TODO: added in priority level to figure out the default search field
            // newAllRows = allRows.sort(dynamicSort({ column: 'firstName'}));
            newAllRows = allRows.sort(dynamicSort({ column }));
            break;
        default:
            newAllRows = allRows.sort(dynamicSort({ column }));
    }

    dispatch(allRowsOrderChanged({ allRows: newAllRows }));
    dispatch(calculateRows());
};

export const allRowsOrderChanged = ({ allRows }) => {
    return { type: types.ROW_ORDER_CHANGED, allRows };
};

export const changeSortColumnAndDirectionSuccess = ({ column, direction }) => {
    return { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column, direction };
};

export const dynamicSort = ({ column }) => {
    // TODO: Figure out how to tell if date
    // return (a, b) => (new Date(b[property]).getTime() - new Date(a[property]).getTime());
    return (a, b) => ((a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0);
};
// TODO: Add table searching
// export const searchRows = ({ searchString }) => (dispatch, getState) => {
//
// };
//
// export const searchRowsSuccess = ({ }) => {
//     return { type: types }
// };
