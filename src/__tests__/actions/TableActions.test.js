//External Libraries
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//Internal Files
import * as actions from '../../actions/TableActions';
import * as types from '../../actions/ActionTypes';
import initialState from '../../store/initialState'
const tableInitialState = { ...initialState.table }

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

beforeEach(() => {
    store = mockStore(initialState);
});

const unorderedRows = [{ id: 2 }, { id: 3 }, { id: 1 }, { id: 6 }, { id: 3 }, { id: 5 }, ]
const ascOrderedRows = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 3 }, { id: 5 }, { id: 6 }, ]
const descOrderedRows = [{ id: 6 }, { id: 5 }, { id: 3 }, { id: 3 }, { id: 2 }, { id: 1 }, ]

const unorderedRowIntialState = {
      ...initialState,
      table: {
          ...initialState.table,
          allRows: unorderedRows,
      }
 }

const unorderedRowNoneIntialState = {
       ...initialState,
       table: {
           ...initialState.table,
           allRows: unorderedRows,
           sort: {
               ...initialState.table.sort,
               direction: 'none',
               column: 'id',
           }
       }
  }

const unorderedRowAscIntialState = {
      ...initialState,
      table: {
          ...initialState.table,
          allRows: unorderedRows,
          sort: {
              ...initialState.table.sort,
              direction: 'ascending',
              column: 'id',
          }
      }
 }

const unorderedRowDescIntialState = {
     ...initialState,
     table: {
         ...initialState.table,
         allRows: unorderedRows,
         sort: {
            ...initialState.table.sort,
            direction: 'descending',
            column: 'id',
        }
    }
}

const unorderedRowDescDifferentDirectionIntialState = {
    ...initialState,
    table: {
        ...initialState.table,
        allRows: unorderedRows,
        sort: {
            ...initialState.table.sort,
            direction: 'dMoney',
            column: 'id',
        }
    }
}

const unorderedRowDescDifferentColumnAndDirectionIntialState = {
    ...initialState,
    table: {
        ...initialState.table,
        allRows: unorderedRows,
        sort: {
            ...initialState.table.sort,
            direction: 'dMoney',
            column: 'dMoney',
        }
    }
}

describe('Search Actions', () => {
    //Actions
    it('should return the all of the returned rows', () => {
        const given = { allRows: [1, 2, 3]}
        const expected = { type: types.FETCHED_DATA_SUCCESS, allRows: [1, 2, 3] };

        expect(actions.fetchDataSuccess(given)).toEqual(expected)
    });

    it('should return only a selection of the rows based on the current page and the total rows per page', () => {
        const given = { displayedRows: [1, 2] }
        const expected = { type: types.CALCULATED_ROWS_FINISHED, displayedRows: [1, 2] };

        expect(actions.calculateRowsSuccess(given)).toEqual(expected)
    });

    it('should update what the current page of the table is', () => {
        const given = { currentPageNumber: 3 }
        const expected = { type: types.CHANGE_CURRENT_PAGE, currentPageNumber: 3 };

        expect(actions.changePageSuccess(given)).toEqual(expected)
    });

    it('should return the sorted rows', () => {
        const given = { allRows: [1, 2, 3] }
        const expected = { type: types.ROW_ORDER_CHANGED, allRows: [1, 2, 3]};

        expect(actions.allRowsOrderChanged(given)).toEqual(expected)
    });

    it('should return the sorted rows', () => {
        const given = { column: 'id', direction: 'ascending' }
        const expected = { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column: 'id', direction: 'ascending' };

        expect(actions.changeSortColumnAndDirectionSuccess(given)).toEqual(expected)
    });

    //Async Actions
    it('should decerement the page and recalulate what rows to show', async() => {
        const given = {};
        const expected = [
            { type: types.CHANGE_CURRENT_PAGE, currentPageNumber: 0 },
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: [{}, {}, {}, {}, {}] }
        ];

        await store.dispatch(actions.previousPage(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should increment the page and recalulate what rows to show', async() => {
        const given = {};
        const expected = [
            { type: types.CHANGE_CURRENT_PAGE, currentPageNumber: 2 },
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: [{}, {}, {}, {}, {}] }
        ];

        await store.dispatch(actions.nextPage(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should return 5 empty rows when there is no data passed in', async() => {
        const given = {};
        const expected = [
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: [{}, {}, {}, {}, {}] }
        ];

        await store.dispatch(actions.calculateRows(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should return 3 empty rows when there is 2 rows with data in state', async() => {
        store = mockStore({ ...initialState, table: { ...initialState.table, allRows: [1, 2] } })
        const given = {};
        const expected = [
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: [1, 2, {}, {}, {}] }
        ];

        await store.dispatch(actions.calculateRows(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should return 0 empty rows when there is 5 rows with data in state', async() => {
        store = mockStore({ ...initialState, table: { ...initialState.table, allRows: [1, 2, 3, 4, 5] } })
        const given = {};
        const expected = [
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: [1, 2, 3, 4, 5] }
        ];

        await store.dispatch(actions.calculateRows(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should return only 5 rows when there is more than 5 rows with data in state', async() => {
        store = mockStore({ ...initialState, table: { ...initialState.table, allRows: [1, 2, 3, 4, 5, 6] } })
        const given = {};
        const expected = [
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: [1, 2, 3, 4, 5] }
        ];

        await store.dispatch(actions.calculateRows(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    // changeSortFieldAndDirection
    it('should change the direction from none to ascending when the columns do not match', async() => {
        store = mockStore(unorderedRowNoneIntialState)
        const given = { newColumn: 'id' };
        const expected = [
            { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column: 'id', direction: 'ascending' },
        ];

        await store.dispatch(actions.changeSortFieldAndDirection(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should change the direction from ascending to descending when the columns do match', async() => {
        store = mockStore(unorderedRowAscIntialState)
        const given = { newColumn: 'id' };
        const expected = [
            { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column: 'id', direction: 'descending' },
        ];

        await store.dispatch(actions.changeSortFieldAndDirection(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should change the direction from descending to none when the columns do match', async() => {
        store = mockStore(unorderedRowDescIntialState)
        const given = { newColumn: 'id' };
        const expected = [
            { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column: 'id', direction: 'none' },
        ];

        await store.dispatch(actions.changeSortFieldAndDirection(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should change the direction from descending to none when the columns do match, but there is a direction that cannot be handled', async() => {
        store = mockStore(unorderedRowDescDifferentDirectionIntialState)
        const given = { newColumn: 'id' };
        const expected = [
            { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column: 'id', direction: 'none' },
        ];

        await store.dispatch(actions.changeSortFieldAndDirection(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should change the direction from descending to ascending when the columns do not match,', async() => {
        store = mockStore(unorderedRowDescDifferentColumnAndDirectionIntialState)
        const given = { newColumn: 'id' };
        const expected = [
            { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column: 'id', direction: 'ascending' },
        ];

        await store.dispatch(actions.changeSortFieldAndDirection(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should update the sort direction of the column and then sort it', async() => {
        store = mockStore(unorderedRowIntialState)
        const given = { column: 'id' };
        const expected = [
            { type: types.SORT_COLUMN_AND_DIRECTION_UPDATED, column: 'id', direction: 'ascending' },
            { type: types.ROW_ORDER_CHANGED, allRows: ascOrderedRows },
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: ascOrderedRows.slice(0, 5) }
        ];

        await store.dispatch(actions.sortColumn(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should sort the results based on the priorty column when none is the case', async() => {
        store = mockStore(unorderedRowIntialState)
        const given = { column: 'id' };
        const expected = [
            { type: types.ROW_ORDER_CHANGED, allRows: ascOrderedRows },
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: ascOrderedRows.slice(0, 5) }
        ];

        await store.dispatch(actions.changeRowOrder(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should sort the results from lowest to highest when ascending is the case', async() => {
        store = mockStore(unorderedRowAscIntialState)
        const given = { column: 'id' };
        const expected = [
            { type: types.ROW_ORDER_CHANGED, allRows: ascOrderedRows },
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: ascOrderedRows.slice(0, 5) }
        ];

        await store.dispatch(actions.changeRowOrder(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });


    it('should sort the results from highest to lowest when descending is the case', async() => {
        store = mockStore(unorderedRowDescIntialState)
        const given = { column: 'id' };
        const expected = [
            { type: types.ROW_ORDER_CHANGED, allRows: descOrderedRows },
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: descOrderedRows.slice(0, 5) }
        ];

        await store.dispatch(actions.changeRowOrder(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    it('should sort the results from lowest to highest when we are not sure what the case is', async() => {
        store = mockStore(unorderedRowDescDifferentDirectionIntialState)
        const given = { column: 'id' };
        const expected = [
            { type: types.ROW_ORDER_CHANGED, allRows: ascOrderedRows },
            { type: types.CALCULATED_ROWS_FINISHED, displayedRows: ascOrderedRows.slice(0, 5) }
        ];

        await store.dispatch(actions.changeRowOrder(given));
        const actualDispatchedActions = store.getActions();

        expect(actualDispatchedActions).toEqual(expected);
    });

    // TODO: Figure out how to test this given that you shouldn't need this later
    // it('should create an action for fetching data for the table', () => {
    //     const expected = { type: types.FETCH_ARTICLES_STARTED };
    //
    //     expect(actions.fetchData()).toEqual(expected)
    // });
});
