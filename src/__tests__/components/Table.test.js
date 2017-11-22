//React
import React from 'react';
//Component
import Table from '../../components/Table';
//Testing
import { shallow, } from 'enzyme';

describe('Table', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
          searchString: '',
          sort: { direction: 'none', column: '', defaultSortColumn: 'email' },
          pagination: { currentPage: 1, rowSize: 5, },
          columns: [
            { accessor: 'firstName', label: 'First Name', isVisible: true, minWidth: 100, priorityLevel: 3, position: 1, },
            { accessor: 'lastName', label: 'Last Name', isVisible: true, minWidth: 50, priorityLevel: 1, position: 2, },
            { accessor: 'email', label: 'Email', isVisible: false, minWidth: 90, priorityLevel: 3, position: 3, },
          ],,
        };

        wrapper = shallow(<Table { ...props } />);
    });

    it('should have 1 search component', () => {
        const searches = wrapper.find('Search');

        expect(searches.length).toBe(1);
    });

    it('should have 1 column header', () => {
        const columns = wrapper.find('Columns');

        expect(columns.length).toBe(1);
    });

    it('should have 1 set of rows', () => {
        const rows = wrapper.find('Rows');

        expect(rows.length).toBe(1);
    });

    it('should have 1 pagination component', () => {
        const paginations = wrapper.find('Pagination');

        expect(paginations.length).toBe(1);
    });
});
