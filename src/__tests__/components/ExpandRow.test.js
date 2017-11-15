//React
import React from 'react';
//Component
import ExpandedRow from '../../components/table/ExpandedRow';
//Testing
import { shallow, } from 'enzyme';

describe('ExpandedRow', () => {
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

        wrapper = shallow(<ExpandedRow { ...props } />);
    });

    it('should have 1 table data cell', () => {
        const tds = wrapper.find('td');

        expect(tds.length).toBe(1);
    });

    it('should display 9 fields that are the hidden fields', () => {
        const ps = wrapper.find('p');

        expect(ps.length).toBe(9);
    });
});
