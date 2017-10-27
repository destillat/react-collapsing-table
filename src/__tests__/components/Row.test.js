//React
import React from 'react';
//Component
import Row from '../../components/table/Row';
//Testing
import { shallow, mount } from 'enzyme';

describe('Row', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            row: {
                firstName: "Brain",
                lastName: "Kling",
                email: "Sandra_Bradtke3@hotmail.com",
                address: "3522 Gianni Ridges",
                city: "Christiansenhaven",
                state: "New Jersey",
                country: "India",
                zipCode: "21758-1323",
                bio: "Et quo iste quo facere sit tenetur deleniti.",
                isOpen: false,
            },
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

        wrapper = mount(<Row { ...props } />);
    });

    it('should have 9 table cells', () => {
        const cells = wrapper.find('Cell');

        expect(cells.length).toBe(9);
    });

    it('should have 1 table row', () => {
        const cells = wrapper.find('tr');

        expect(cells.length).toBe(1);
    });

    it('should have 2 table rows when the row has been expanded', () => {
        props = { ...props, row: { ...props.row, isOpen: true } };
        wrapper = mount(<Row { ...props } />);
        const cells = wrapper.find('tr');

        expect(cells.length).toBe(2);
    });
});
