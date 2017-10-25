//React
import React from 'react';
//Component
import Columns from '../../components/table/Columns';
//Testing
import { shallow, } from 'enzyme';

describe('Columns', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
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

        wrapper = shallow(<Columns { ...props } />);
    });

    it('should have 9 columns', () => {
        const columns = wrapper.find('Column');

        expect(columns.length).toBe(9);
    });
});
