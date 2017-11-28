//React
import React from 'react';
//Component
import Rows from '../../components/Rows';
//Testing
import { shallow, } from 'enzyme';

describe('Rows', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            rows: [
              { firstName: 'Paul', }, 
              { firstName: 'Matt', },
              { firstName: 'Michelle', },
              { firstName: 'David', },
              { firstName: 'Tiffany', }
            ],
            visibleColumns: [
                { accessor: 'firstName', label: 'First Name', isVisible: true, },
                { accessor: 'lastName', label: 'Last Name', isVisible: true, },
                { accessor: 'email', label: 'Email', isVisible: true, },
                { accessor: 'address', label: 'Address', isVisible: true, },
                { accessor: 'city', label: 'City', isVisible: true, },
                { accessor: 'state', label: 'State', isVisible: true, },
                { accessor: 'country', label: 'Country', isVisible: true, },
            ],
            hiddenColumns: [
                { accessor: 'zipCode', label: 'Zip Code', isVisible: false, },
                { accessor: 'bio', label: 'Bio', isVisible: false, },
            ],
            expandRow: jest.fn(),
        };

        wrapper = shallow(<Rows { ...props } />);
    });

    it('should have 5 rows', () => {
        const rows = wrapper.find('Row');

        expect(rows.length).toBe(5);
    });
});
