//External Libraries
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//Internal Files
import * as actions from '../../actions/TableActions';
import * as types from '../../actions/ActionTypes';

describe('Search Actions', () => {
    //Actions
    it('should create an action for succesfully fetching data for the table', () => {
        const given = { data: [1, 2, 3]}
        const expected = { type: types.FETCHED_DATA_SUCCESS, data: [1, 2, 3] };

        expect(actions.fetchDataSuccess(given)).toEqual(expected)
    });

    //Async Actions
    // TODO: Figure out how to test this given that you shouldn't need this later
    // it('should create an action for fetching data for the table', () => {
    //     const expected = { type: types.FETCH_ARTICLES_STARTED };
    //
    //     expect(actions.fetchData()).toEqual(expected)
    // });
});
