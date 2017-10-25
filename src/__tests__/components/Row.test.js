//React
import React from 'react';
//Component
import Row from '../../components/table/Row';
//Testing
import { shallow, } from 'enzyme';

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

        wrapper = shallow(<Row { ...props } />);
    });

    it('should have 9 table cells', () => {
        const cells = wrapper.find('Cell');

        expect(cells.length).toBe(9);
    });
});
