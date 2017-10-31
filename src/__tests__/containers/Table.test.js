//React
import React from 'react';
//Components
import TableContainer, { Table } from '../../containers/Table';
import initialState from '../../store/initialState';
import { Provider } from 'react-redux';
//Redux
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//Testing
import { mount, shallow } from 'enzyme';


describe('Table Container', () => {
    let wrapper, thisInitialState, props, instance;

    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);

    beforeEach(() => {
        props = {
            table: initialState.table,
            actions: {
                //TODO: Remove when data is passed in
                fetchData: jest.fn(),
                nextPage: jest.fn(),
                previousPage: jest.fn(),
                sortColumn: jest.fn(),
                searchRows: jest.fn(),
                expandRow: jest.fn(),
                clearSearch: jest.fn(),
                addColumn: jest.fn(),
                removeColumn: jest.fn(),
            }
        };

        wrapper = shallow(<Table {...props} />);
        instance = wrapper.instance();
    });

    it('tests a successful mount of the search screen', () => {
        const store = mockStore(initialState);

        wrapper = mount(
            <Provider store={ store } >
                <TableContainer { ...props } />
            </Provider>);

        const searches = wrapper.find('table');
        expect(searches.length).toBe(1);
    });

    it('should trigger the action methods when called', () => {
        instance.previousPage();
        expect(props.actions.previousPage).toHaveBeenCalled();

        instance.nextPage();
        expect(props.actions.nextPage).toHaveBeenCalled();

        instance.addColumn();
        expect(props.actions.addColumn).toHaveBeenCalled();

        instance.removeColumn();
        expect(props.actions.removeColumn).toHaveBeenCalled();

        instance.clearSearch();
        expect(props.actions.clearSearch).toHaveBeenCalled();

        instance.sortColumn({ column: 'id' });
        expect(props.actions.sortColumn).toHaveBeenCalledWith({ column: 'id' });

        instance.searchRows({ target: { value: 'Hello' } });
        expect(props.actions.searchRows).toHaveBeenCalledWith({ searchString: 'Hello' });

        instance.expandRow({ rowIndex: 5 });
        expect(props.actions.expandRow).toHaveBeenCalledWith({ rowIndex: 5 });
    });
});
