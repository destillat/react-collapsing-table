//React
import React from 'react';
//Component
import Table from '../../components/table/Table';
//Testing
import { shallow, } from 'enzyme';

describe('Table', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            table: {
                rows: {
                    displayed: [1, 2, 3, 4, 5],
                },
                columns: {
                    visible: [
                        { accessor: 'firstName', label: 'First Name' },
                        { accessor: 'lastName', label: 'Last Name' },
                        { accessor: 'email', label: 'Email' },
                        { accessor: 'address', label: 'Address' },
                        { accessor: 'city', label: 'City' },
                        { accessor: 'state', label: 'State' },
                        { accessor: 'country', label: 'Country' },
                    ],
                    hidden: [
                        { accessor: 'zipCode', label: 'Zip Code' },
                        { accessor: 'bio', label: 'Bio' },
                    ],
                },
                pagination: {
                    currentPage: 3,
                },
                globalSearchString: ''
            },
        };

        wrapper = shallow(<Table { ...props } />);
    });

    it('should have 1 search component', () => {
        console.log(props);
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
