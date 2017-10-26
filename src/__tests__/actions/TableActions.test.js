//External Libraries
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//Internal Files
import * as actions from '../../actions/TableActions';
import * as types from '../../actions/ActionTypes';
import initialState from '../../store/initialState'

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

beforeEach(() => {
    store = mockStore(initialState);
});

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

    // TODO: Figure out how to test this given that you shouldn't need this later
    // it('should create an action for fetching data for the table', () => {
    //     const expected = { type: types.FETCH_ARTICLES_STARTED };
    //
    //     expect(actions.fetchData()).toEqual(expected)
    // });
});
