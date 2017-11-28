//React
import React from 'react';
//Component
import Column from '../../components/Column';
//Testing
import { shallow, } from 'enzyme';

describe('Column', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            accessor: 'firstName',
            label: 'First Name',
            onClick: jest.fn(),
            sort: {
                direction: 'ascending',
                column: 'lastName',
                defaultSortColumn: 'email',
            },
        };

        wrapper = shallow(<Column { ...props } />);
    });

    it('should have 1 table header', () => {
        const ths = wrapper.find('th');

        expect(ths.length).toBe(1);
    });

    it('should have a specific css class for the table header', () => {
        const th = wrapper.find('th');

        expect(th.hasClass('column-firstName')).toEqual(true);
    });

    it('should have First Name displayed in the table header', () => {
        const thText = wrapper.find('th').text();

        expect(thText).toBe('First Name');
    });

    it('should have an ascending Icon', () => {
        props = { ...props, sort: { ...props.sort, column: 'firstName' } };
        wrapper = shallow(<Column { ...props } />);
        const caretUps = wrapper.find('FaCaretUp');

        expect(caretUps.length).toBe(1);
    });

    it('should have an descending Icon', () => {
        props = {
            ...props,
            sort: {
                ...props.sort,
                column: 'firstName',
                direction: 'descending'
            }
        };
        wrapper = shallow(<Column { ...props } />);
        const caretDowns = wrapper.find('FaCaretDown');

        expect(caretDowns.length).toBe(1);
    });

    it('should fire an action when the th is clicked', () => {
        wrapper.find('th').first().simulate('click');

        expect(props.onClick).toHaveBeenCalled();
    });
});
