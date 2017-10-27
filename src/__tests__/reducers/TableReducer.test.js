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

    it('should ', () => {
        const action = { type: types.FETCHED_DATA_SUCCESS, allRows: [1, 2, 3] };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = { ...tableInitialState, allRows: [1, 2, 3] };

        expect( nextState ).toEqual( expectedState );
    });

    it('should return ', () => {
        const action = { type: types.CALCULATED_ROWS_FINISHED, displayedRows: [1, 2, 3] };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = { ...tableInitialState, displayedRows: [1, 2, 3] };

        expect( nextState ).toEqual( expectedState );
    });

    it('should ', () => {
        const action = { type: types.CHANGE_CURRENT_PAGE, currentPageNumber: 2 };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = { ...tableInitialState, currentPageNumber: 2 };

        expect( nextState ).toEqual( expectedState );
    });

    it('should ', () => {
        const action = { type: types.ROW_ORDER_CHANGED, allRows: [1, 2, 3] };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = { ...tableInitialState, allRows: [1, 2, 3] };

        expect( nextState ).toEqual( expectedState );
    });

    it('should ', () => {
        const action = { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column: 'id', direction: 'ascending' };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = { ...tableInitialState, sort: { ...tableInitialState.sort, column: 'id', direction: 'ascending' } };

        expect( nextState ).toEqual( expectedState );
    });
});
