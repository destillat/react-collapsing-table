//React
import React from 'react';
//Component
import * as actions from '../../assets/icons/Icon';
//Testing
import { shallow, } from 'enzyme';

describe('Icon', () => {
    let wrapper, props;

    //sortDirection -> used for generating an icon for the table sorting direction
    it('should return an caret that is going up', () => {
        props = { direction: 'ascending' };
        wrapper = shallow(actions.sortDirection(props));

        const caretUps = wrapper.find('FaCaretUp');

        expect(caretUps.length).toBe(1);
    });

    it('should return an caret that is going down', () => {
        props = { direction: 'descending' };
        wrapper = shallow(actions.sortDirection(props));

        const caretDowns = wrapper.find('FaCaretDown');

        expect(caretDowns.length).toBe(1);
    });

    it('should return no caret', () => {
        props = {};
        wrapper = shallow(actions.sortDirection(props));

        const caretDowns = wrapper.find('FaCaretDown');
        const caretUps = wrapper.find('FaCaretUp');

        expect(caretUps.length).toBe(0);
        expect(caretDowns.length).toBe(0);
    });

    //expandIcon -> used for generating an icon based on if a row is open or closed
    it('should check that it can return no icon', () => {
        props = {
            cellIndex: 1,
            rowIndex: 1,
            hiddenColumnsLength: 0,
            row: {
                isOpen: true,
            },
            actions: {
                expandRow: jest.fn(),
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        const arrowUps = wrapper.find('MdKeyboardArrowUp');
        const arrowDowns = wrapper.find('MdKeyboardArrowDown');

        expect(arrowDowns.length).toBe(0);
        expect(arrowUps.length).toBe(0);
    });

    it('should check that it can return an up arrow icon', () => {
        props = {
            cellIndex: 0,
            rowIndex: 1,
            hiddenColumnsLength: 2,
            row: {
                isOpen: true,
                anotherField: 'field!!!!'
            },
            actions: {
                expandRow: jest.fn(),
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        const arrowUps = wrapper.find('MdKeyboardArrowUp');

        expect(arrowUps.length).toBe(1);
    });

    it('should check that it can return an down arrow icon', () => {
        props = {
            cellIndex: 0,
            rowIndex: 1,
            hiddenColumnsLength: 2,
            row: {
                isOpen: false,
                anotherField: 'field!!!!'
            },
            actions: {
                expandRow: jest.fn(),
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        const arrowDowns = wrapper.find('MdKeyboardArrowDown');

        expect(arrowDowns.length).toBe(1);
    });

    it('should see if clicking the icon returns the correct value', () => {
        props = {
            cellIndex: 0,
            rowIndex: 1,
            hiddenColumnsLength: 2,
            row: {
                isOpen: false,
                anotherField: 'field!!!!'
            },
            actions: {
                expandRow: jest.fn(),
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        wrapper.find('MdKeyboardArrowDown').simulate('click');

        expect(props.actions.expandRow).toHaveBeenCalledWith({ rowIndex: 1 });
    });

    //Get Icons for the application
    it('should return an down arrow icon', () => {
        props = { name: 'OpenRow' };
        wrapper = shallow(actions.getIcon(props));
        const arrowDowns = wrapper.find('MdKeyboardArrowDown');

        expect(arrowDowns.length).toBe(1);
    });

    it('should return an up arrow icon', () => {
        props = { name: 'CloseRow' };
        wrapper = shallow(actions.getIcon(props));
        const arrowUps = wrapper.find('MdKeyboardArrowUp');

        expect(arrowUps.length).toBe(1);
    });

    it('should return an down caret icon', () => {
        props = { name: 'descending' };
        wrapper = shallow(actions.getIcon(props));
        const CaretDowns = wrapper.find('FaCaretDown');

        expect(CaretDowns.length).toBe(1);
    });

    it('should return an up caret icon', () => {
        props = { name: 'ascending' };
        wrapper = shallow(actions.getIcon(props));
        const CaretUps = wrapper.find('FaCaretUp');

        expect(CaretUps.length).toBe(1);
    });

    it('should return no icons', () => {
        props = {};
        wrapper = shallow(actions.getIcon(props));

        const arrowUps = wrapper.find('MdKeyboardArrowUp');
        const arrowDowns = wrapper.find('MdKeyboardArrowDown');
        const CaretUps = wrapper.find('FaCaretUp');
        const CaretDowns = wrapper.find('FaCaretUp');

        expect(CaretDowns.length).toBe(0);
        expect(CaretUps.length).toBe(0);
        expect(arrowDowns.length).toBe(0);
        expect(arrowUps.length).toBe(0);
    });

    it('should be able to call the on click funtion', () => {
        props = { name: 'OpenRow', onClick: jest.fn() };
        wrapper = shallow(actions.getIcon(props));

        wrapper.find('MdKeyboardArrowDown').simulate('click');

        expect(props.onClick).toHaveBeenCalled;
    });
});
