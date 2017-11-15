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
            table: {
                globalSearchString: '',
                sort: { direction: 'none', column: '' },
                pagination: { currentPage: 1, rowSize: 5, possibleRowSizes: [15, 30, 60] },
                columns: { initial: [], visible: [], hidden: [] },
                rows: { initial: [], filtered: [], displayed: [] },
            },
            actions: {},
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
