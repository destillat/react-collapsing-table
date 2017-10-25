//Redux
import { combineReducers } from 'redux';
//Reducers
import table from './TableReducer';

const rootReducer = combineReducers({
    table,
});

export default rootReducer;