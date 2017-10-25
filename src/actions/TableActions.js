//Actions
import * as types from './ActionTypes'
//Fake API
import * as TableApi from '../utils/api/TableAPI.dev';

export const fetchData = () => async dispatch => {
  try {
      let payload = await TableApi.generateFakeData();
      console.log(payload);
      dispatch(fetchDataSuccess({ data: payload }))
  } catch (error) {
      console.log(error);
  }
}

export const fetchDataSuccess = ({ data }) => {
    return { type: types.FETCHED_DATA_SUCCESS, data}
}
