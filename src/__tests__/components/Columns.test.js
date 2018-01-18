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
                { accessor: 'firstName', label: 'First Name', isVisible: true, sortable: true, },
                { accessor: 'lastName', label: 'Last Name', isVisible: true, sortable: true, },
                { accessor: 'email', label: 'Email', isVisible: false, sortable: true, },
                { accessor: 'address', label: 'Address', isVisible: true, sortable: true, },
                { accessor: 'city', label: 'City', isVisible: true, sortable: true, },
                { accessor: 'state', label: 'State', isVisible: false, sortable: true, },
                { accessor: 'country', label: 'Country', isVisible: true, sortable: true, },
                { accessor: 'zipCode', label: 'Zip Code', isVisible: true, sortable: true, },
                { accessor: 'bio', label: 'Bio', isVisible: true, sortable: true, },
            ],
            sortRows: jest.fn(),
            clearSearch: jest.fn(),
            sort: {
                direction: 'ascending',
                column: 'firstName',
                defaultSortColumn: 'email',
            },
            icons: null,
        };

        wrapper = shallow(<Columns { ...props } />);
    });

    it('should have 9 columns', () => {
        const columns = wrapper.find('Column');

        expect(columns.length).toBe(9);
    });
});
