//Reducer
import TableReducer from '../../reducers/TableReducer';
//Action Types
import * as types from '../../actions/ActionTypes';
//State
import initialState from '../../store/initialState';

const tableInitialState = initialState.table;

describe('table reducer', () => {
    it('should return the initial state', () => {
        expect( TableReducer(undefined, {}) ).toEqual( tableInitialState )
    });

    it('should not affect state', () => {
        expect( TableReducer(tableInitialState, { type: 'NOT_EXISTING' } ) ).toEqual( tableInitialState )
    });

    it('should fetcha data to populate the table', () => {
        const action = { type: types.FETCHED_DATA_SUCCESS, data: [1, 2, 3] };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = { ...tableInitialState, data: [1, 2, 3] };

        expect( nextState ).toEqual( expectedState );
    });
});
