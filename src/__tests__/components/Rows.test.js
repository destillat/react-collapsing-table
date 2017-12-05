//React
import React from 'react';
//Component
import Rows from '../../components/Rows';
//Testing
import { shallow, } from 'enzyme';
import {mount} from "enzyme/build/index";

describe('Rows', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            rows: [
                {
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
                {
                    firstName: 'Tom',
                    lastName: 'Rodgers',
                    email: 'tomRodgers@hotmail.com',
                    address: '3522 Maryann Road',
                    city: 'Attleboro',
                    state: 'New York',
                    country: 'Bortles',
                    zipCode: '03902',
                    bio: 'Et tenetur deleniti.',
                    isOpen: false,
                },
                {
                    firstName: 'Steven',
                    lastName: 'Brady',
                    email: 'steven123@hotmail.com',
                    address: '3522 Seaport Way',
                    city: 'Austin',
                    state: 'New Mexico',
                    country: 'Bananas',
                    zipCode: '21723',
                    bio: 'Iste quo facere.',
                    isOpen: false,
                },
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
            callbacks: {},
        };

        wrapper = shallow(<Rows { ...props } />);
    });

    it('should have 3 rows', () => {
        const rows = wrapper.find('Row');

        expect(rows.length).toBe(3);
    });

    it('should have 3 table rows and 1 expanded row when the first row has been expanded', () => {
        props = { ...props, rows: props.rows.map((row, index) => index === 0 ? { ...row, isOpen: true } : row ) };
        wrapper = mount(<Rows { ...props } />);
        const rows = wrapper.find('Row');
        const expandedRows = wrapper.find('ExpandedRow');

        expect(expandedRows.length).toBe(1);
        expect(rows.length).toBe(3);
    });

    it('should show 2 columns that were hidden', () => {
        props = { ...props, rows: props.rows.map((row, index) => index === 0 ? { ...row, isOpen: true } : row ) };
        wrapper = mount(<Rows { ...props } />);
        const cells = wrapper.find('p');

        expect(cells.length).toBe(2);
    });
});
