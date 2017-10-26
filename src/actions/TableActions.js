//Actions
import * as types from './ActionTypes'
//Fake API
import * as TableApi from '../utils/api/TableAPI.dev';

export const fetchData = () => async dispatch => {
  try {
      let payload = await TableApi.generateFakeData();

      dispatch(fetchDataSuccess({ allRows: payload }))
      dispatch(calculateRows())
  } catch (error) {
      console.log(error);
  }
}

export const fetchDataSuccess = ({ allRows }) => {
    return { type: types.FETCHED_DATA_SUCCESS, allRows }
}

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
}

export const calculateRowsSuccess = ({ displayedRows }) => {
    return { type: types.CALCULATED_ROWS_FINISHED, displayedRows }
}

//TODO: Stop users from going to a totally blank page (to high)
export const nextPage = () => (dispatch, getState) => {
    const state = getState();
    const { table: { allRows, currentPageNumber, rowSize } } = state

    dispatch(changePageSuccess({ currentPageNumber: currentPageNumber + 1 }))
    dispatch(calculateRows())
}

//TODO: Stop users from going to a totally blank page (to low)
export const previousPage = () => (dispatch, getState) => {
    const state = getState();

    const { table: { currentPageNumber } } = state

    dispatch(changePageSuccess({ currentPageNumber: currentPageNumber - 1 }))
    dispatch(calculateRows())
}

export const changePageSuccess = ({ currentPageNumber }) => {
    return { type: types.CHANGE_CURRENT_PAGE, currentPageNumber }
}
