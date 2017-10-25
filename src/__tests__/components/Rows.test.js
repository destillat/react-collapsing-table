//React
import React from 'react';
//Component
import Rows from '../../components/table/Rows';
//Testing
import { shallow, } from 'enzyme';

describe('Rows', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            rows: [1, 2, 3, 4, 5],
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

        wrapper = shallow(<Rows { ...props } />);
    });

    it('should have 5 rows', () => {
        const rows = wrapper.find('Row');

        expect(rows.length).toBe(5);
    });
});
