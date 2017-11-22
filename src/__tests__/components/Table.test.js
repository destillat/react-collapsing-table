//React
import React from 'react';
//Component
import Table from '../../components/Table';
import * as searchActions from '../../actions/SearchActions';
import * as resizeTableActions from '../../actions/ResizeTableActions';
import * as tableActions from '../../actions/TableActions';
//Testing
import { mount, shallow, } from 'enzyme';

describe('Table', () => {
    let wrapper, props, instance;

    beforeEach(() => {
        props = {
          sort: { direction: 'none', column: '', defaultSortColumn: 'email' },
          pagination: { currentPage: 1, rowSize: 5, },
          columns: [
            { accessor: 'firstName', label: 'First Name', isVisible: true, minWidth: 100, priorityLevel: 3, position: 1, },
            { accessor: 'lastName', label: 'Last Name', isVisible: true, minWidth: 50, priorityLevel: 1, position: 2, },
            { accessor: 'email', label: 'Email', isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
          initialRows: [
            { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
            { firstName: 'Matt', lastName: 'Smith', isOpen: true },
            { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
          ],
          rows: [
            { firstName: 'Paul', lastName: 'Darragh', isOpen: true },
            { firstName: 'Matt', lastName: 'Smith', isOpen: true },
            { firstName: 'Michelle', lastName: 'Piper', isOpen: true },
          ],
      };

        searchActions.clearSearch = jest.fn();
        searchActions.searchRows = jest.fn();

        resizeTableActions.resizeTable = jest.fn();

        tableActions.sortColumn = jest.fn();
        tableActions.nextPage = jest.fn();
        tableActions.previousPage = jest.fn();
        tableActions.expandRow = jest.fn();

        wrapper = shallow(<Table { ...props } />);
        instance = wrapper.instance();
    });

    it('should have all of the basic table components', () => {
        wrapper = mount(<Table { ...props }/>)
        const searches = wrapper.find('Search');
        const columns = wrapper.find('Columns');
        const rows = wrapper.find('Rows');
        const paginations = wrapper.find('Pagination');

        expect(paginations.length).toBe(1);
        expect(rows.length).toBe(1);
        expect(columns.length).toBe(1);
        expect(searches.length).toBe(1);
    });

    it('should render correctly with no rows', () => {
        props = {
          sort: { direction: 'none', column: '', defaultSortColumn: 'email' },
          pagination: { currentPage: 1, rowSize: 5, },
          columns: [
            { accessor: 'firstName', label: 'First Name', isVisible: true, minWidth: 100, priorityLevel: 3, position: 1, },
            { accessor: 'lastName', label: 'Last Name', isVisible: true, minWidth: 50, priorityLevel: 1, position: 2, },
            { accessor: 'email', label: 'Email', isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],
        };
        wrapper = mount(<Table { ...props }/>)
        const searches = wrapper.find('Search');
        const columns = wrapper.find('Columns');
        const rows = wrapper.find('Rows');
        const paginations = wrapper.find('Pagination');

        expect(paginations.length).toBe(1);
        expect(rows.length).toBe(1);
        expect(columns.length).toBe(1);
        expect(searches.length).toBe(1);
    });

    it('should test all of the Search Actions', () => {
        instance.searchRows({ target: { value: 'Tim' }});
        expect(searchActions.searchRows).toHaveBeenCalled();

        instance.clearSearch();
        expect(searchActions.clearSearch).toHaveBeenCalled();
    });

    it('should test all of the Resize Table Actions', () => {
        instance.resizeTable();
        expect(resizeTableActions.resizeTable).toHaveBeenCalled();
    });

    it('should test all of the Table Actions', () => {
        instance.sortRows({ column: 'firstName' });
        expect(tableActions.sortColumn).toHaveBeenCalled();

        instance.nextPage();
        expect(tableActions.nextPage).toHaveBeenCalled();

        instance.previousPage();
        expect(tableActions.previousPage).toHaveBeenCalled();

        instance.expandRow({ rowIndex: 3 });
        expect(tableActions.expandRow).toHaveBeenCalled();
    });

    it('should test that the mounting and unmounting of the component is called', () => {
      const willMount = jest.spyOn(Table.prototype, 'componentWillMount');
      const didMount = jest.spyOn(Table.prototype, 'componentDidMount');
      const willUnmount = jest.spyOn(Table.prototype, 'componentWillUnmount');

      wrapper = mount(<Table { ...props } />);
      instance = wrapper.instance();

      expect(willMount).toHaveBeenCalled();
      expect(didMount).toHaveBeenCalled();
      expect(willUnmount.mock.calls).toEqual([]);
      wrapper.unmount();
      expect(willMount).toHaveBeenCalled();
      expect(didMount).toHaveBeenCalled();
      expect(willUnmount).toHaveBeenCalled();
    })
});
