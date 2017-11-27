//React
import React from 'react';
//Component
import Cell from '../../components/Cell';
//Testing
import { shallow, } from 'enzyme';

describe('Cell', () => {
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
            accessor: 'firstName',
            cellIndex: 2,
            rowIndex: 2,
            expandRow: jest.fn(),
            hiddenColumnsLength: 4,
        };

        wrapper = shallow(<Cell { ...props } />);
    });

    it('should render 1 table cell', () => {
        const tds = wrapper.find('td');

        expect(tds.length).toBe(1);
    });

    it('should display the table cell with a open row icon', () => {
        props = { ...props, cellIndex: 0, };
        wrapper = shallow(<Cell { ...props } />);

        const expandArrows = wrapper.find('MdKeyboardArrowDown');

        expect(expandArrows.length).toBe(1);
    });

    it('should display the table cell with a close row icon', () => {
        props = { ...props, cellIndex: 0, isOpen: false };
        wrapper = shallow(<Cell { ...props } />);
        console.log(wrapper.debug());
        const expandArrows = wrapper.find('MdKeyboardArrowUp');

        expect(expandArrows.length).toBe(1);
    });
});
