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
            data: [1, 2, 3, 4, 5],
            columns: [
                { accessor: 'firstName', label: 'First Name' },
                { accessor: 'lastName', label: 'Last Name' },
                { accessor: 'email', label: 'Email' },
                { accessor: 'address', label: 'Address' },
                { accessor: 'city', label: 'City' },
                { accessor: 'state', label: 'State' },
                { accessor: 'country', label: 'Country' },
                { accessor: 'zipCode', label: 'Zip Code' },
                { accessor: 'bio', label: 'Bio' },
            ],
        };

        wrapper = shallow(<Table { ...props } />);
    });

    it('should have 1 column header', () => {
        const columns = wrapper.find('Columns');

        expect(columns.length).toBe(1);
    });

    it('should have 1 set of rows', () => {
        const rows = wrapper.find('Rows');

        expect(rows.length).toBe(1);
    });
});
