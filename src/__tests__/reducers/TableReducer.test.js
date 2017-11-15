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

    it('should update the row and columns upon load of new props', () => {
        const action = {
            type: types.FETCHED_DATA_SUCCESS,
            rows: [1, 2, 3],
            columns: [1, 2]
        };
        const nextState = TableReducer(tableInitialState, action);

        const expectedState = {
            ...tableInitialState,
            rows: {
                ...tableInitialState.rows,
                initial: [1, 2, 3],
                filtered: [1, 2, 3],
            },
            columns: {
                ...tableInitialState.columns,
                initial: [1, 2],
                visible: [1, 2],
            },
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should return the list of rows to be display', () => {
        const action = { type: types.CALCULATED_ROWS_FINISHED, visibleRows: [1, 2, 3] };
        const nextState = TableReducer(tableInitialState, action);

        const expectedState = {
            ...tableInitialState,
            rows: {
                ...tableInitialState.rows,
                displayed: [1, 2, 3]
            }
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should upddate to show the new page number', () => {
        const action = { type: types.CHANGE_CURRENT_PAGE, currentPage: 2 };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = {
            ...tableInitialState,
            pagination: {
                ...tableInitialState.pagination,
                currentPage: 2
            }
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should update the order of the rows after being sorted', () => {
        const action = { type: types.ROWS_SORTED, rows: [1, 2, 3] };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = {
            ...tableInitialState,
            rows: { ...tableInitialState.rows, filtered: [1, 2, 3] }
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should update state based on what column and direction is being sorted on', () => {
        const action = {
            type: types.SORT_COLUMN_AND_DIRECTION_UPDATED,
            column: 'id',
            direction: 'ascending'
         };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = {
            ...tableInitialState,
            sort: {
                ...tableInitialState.sort,
                column: 'id',
                direction: 'ascending'
            }
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should expand one row based on the index of that row', () => {
        const rows = [{ isOpen: false }, { isOpen: false }, { isOpen: false }];
        const newInitialState = {
            ...tableInitialState,
            rows: { ...tableInitialState.rows, displayed: rows }
        };

        const action = { type: types.EXPAND_ROW, rowIndex: 2, };
        const nextState = TableReducer(newInitialState, action );

        const expectedState = {
            ...tableInitialState,
            rows: {
                ...tableInitialState.rows,
                displayed: [{ isOpen: false }, { isOpen: false }, { isOpen: true }]
            }
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should update the filtered rows based on the search string', () => {
        const action = { type: types.FILTERED_TABLE, rows: [1, 2, 3] };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = {
            ...tableInitialState,
            rows: { ...tableInitialState.rows, filtered: [1, 2, 3] }
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should update the search string values', () => {
        const action = { type: types.SEARCH_STRING_UPDATED, value: 'hi' };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = { ...tableInitialState, globalSearchString: 'hi', };

        expect( nextState ).toEqual( expectedState );
    });

    it('should reset the search string and set the filtered rows to the initial rows', () => {
        const newInitialState = {
            ...tableInitialState,
            rows: { ...tableInitialState.rows, initial: [1, 2] }
        };
        const action = { type: types.CLEAR_SEARCH, };
        const nextState = TableReducer(newInitialState, action );

        const expectedState = {
            ...tableInitialState,
            rows: { ...newInitialState.rows, filtered: [1, 2] },
            globalSearchString: '',
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should update the hidden and visible columns', () => {
        const action = { type: types.RESIZED_TABLE, visible: [1, 2], hidden: [3] };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = {
            ...tableInitialState,
            columns: {
                ...tableInitialState.columns,
                visible: [1, 2],
                hidden: [3],
            },
        };

        expect( nextState ).toEqual( expectedState );
    });

    it('should update the displayed rows when those rows are closed', () => {
        const action = { type: types.CLOSED_ALL_ROWS, rowsDisplayed: [1, 2] };
        const nextState = TableReducer(tableInitialState, action );

        const expectedState = {
            ...tableInitialState,
            rows: {
                ...tableInitialState.rows,
                displayed: [1, 2],
            },
        };

        expect( nextState ).toEqual( expectedState );
    });
});
