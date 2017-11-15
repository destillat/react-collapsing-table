//React
import React from 'react';
//Component
import Cell from '../../components/table/Cell';
//Testing
import { shallow, } from 'enzyme';

describe('Cell', () => {
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
            accessor: 'firstName',
        };

        wrapper = shallow(<Cell { ...props } />);
    });

    it('should render 1 table cell', () => {
        const tds = wrapper.find('td');

        expect(tds.length).toBe(1);
    });
});
