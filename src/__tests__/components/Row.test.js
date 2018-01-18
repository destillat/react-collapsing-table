//React
import React from 'react';
//Component
import Row from '../../components/Row';
//Testing
import { shallow, mount } from 'enzyme';

describe('Row', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            row: {
                firstName: 'Brain',
                lastName: 'Kling',
                email: 'Sandra_Bradtke3@hotmail.com',
                address: '3522 Gianni Ridges',
                city: 'Christiansenhaven',
                state: 'New Jersey',
                country: 'India',
                zipCode: '21758-1323',
                bio: 'Et quo iste quo facere sit tenetur deleniti.',
                isOpen: false,
            },
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
            rowIndex: 2,
            callbacks: {},
            icons: null,
        };

        wrapper = mount(<Row { ...props } />);
    });

    it('should have 7 table cells', () => {
        const cells = wrapper.find('Cell');

        expect(cells.length).toBe(7);
    });

    it('should have 1 table row', () => {
        const cells = wrapper.find('tr');

        expect(cells.length).toBe(1);
    });
});
