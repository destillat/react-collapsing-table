//React
import React from 'react';
//Component
import Columns from '../../components/Columns';
//Testing
import { shallow, } from 'enzyme';

describe('Columns', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            columns: [
                { accessor: 'firstName', label: 'First Name', isVisible: true },
                { accessor: 'lastName', label: 'Last Name', isVisible: true },
                { accessor: 'email', label: 'Email', isVisible: false },
                { accessor: 'address', label: 'Address', isVisible: true },
                { accessor: 'city', label: 'City', isVisible: true },
                { accessor: 'state', label: 'State', isVisible: false },
                { accessor: 'country', label: 'Country', isVisible: true },
                { accessor: 'zipCode', label: 'Zip Code', isVisible: true },
                { accessor: 'bio', label: 'Bio', isVisible: true },
            ],
            sortRows: jest.fn(),
            clearSearch: jest.fn(),
            sort: {
                direction: 'ascending',
                column: 'firstName',
                defaultSortColumn: 'email',
            }
        };

        wrapper = shallow(<Columns { ...props } />);
    });

    it('should have 9 columns', () => {
        const columns = wrapper.find('Column');

        expect(columns.length).toBe(9);
    });
});
