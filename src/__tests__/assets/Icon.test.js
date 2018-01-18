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
        props = { direction: 'ascending', icons: null };
        wrapper = shallow(actions.sortDirection(props));

        const caretUps = wrapper.find('FaCaretUp');

        expect(caretUps.length).toBe(1);
    });

    it('should return an caret that is going down', () => {
        props = { direction: 'descending', icons: null };
        wrapper = shallow(actions.sortDirection(props));

        const caretDowns = wrapper.find('FaCaretDown');

        expect(caretDowns.length).toBe(1);
    });

    it('should return no caret', () => {
        props = { icons: null };
        wrapper = shallow(actions.sortDirection(props));

        const caretDowns = wrapper.find('FaCaretDown');
        const caretUps = wrapper.find('FaCaretUp');

        expect(caretUps.length).toBe(0);
        expect(caretDowns.length).toBe(0);
    });

    it('should return an caret that is going up if both icons ascending and descending is not there', () => {
        props = {
            direction: 'ascending',
            icons: { ascending: <span className="ascending" /> }
        };
        wrapper = shallow(actions.sortDirection(props));

        const caretUps = wrapper.find('FaCaretUp');

        expect(caretUps.length).toBe(1);
    });

    it('should return an caret that is going down if both icons ascending and descending is not there', () => {
        props = {
            direction: 'descending',
            icons: { descending: <span className="descending" /> }
        };
        wrapper = shallow(actions.sortDirection(props));

        const caretDowns = wrapper.find('FaCaretDown');

        expect(caretDowns.length).toBe(1);
    });

    it('should return the custom icon for ascending', () => {
        props = {
            direction: 'ascending',
            icons: {
                ascending: <span className="ascending" />,
                descending: <span className="descending" />,
            }
        };
        wrapper = shallow(actions.sortDirection(props));

        const span = wrapper.find('span').last();

        expect(span.hasClass('ascending')).toBe(true);
    });

    it('should return the custom icon for descending', () => {
        props = {
            direction: 'descending',
            icons: {
                ascending: <span className="ascending" />,
                descending: <span className="descending" />,
            }
        };
        wrapper = shallow(actions.sortDirection(props));

        const span = wrapper.find('span').last();

        expect(span.hasClass('descending')).toBe(true);
    });

    //expandIcon -> used for generating an icon based on if a row is open or close
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
            },
            icons: null
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
            },
            icons: null
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
            },
            icons: null
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
            expandRow: jest.fn(),
            icons: null
        };
        wrapper = shallow(actions.expandIcon(props));

        wrapper.find('MdKeyboardArrowDown').simulate('click');

        expect(props.expandRow).toHaveBeenCalledWith({ rowIndex: 1 });
    });

    it('should check that it can return an up arrow icon if both icons openRow and closeRow is not there', () => {
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
            },
            icons: {
                openRow: <span className="open" />,
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        const arrowUps = wrapper.find('MdKeyboardArrowUp');

        expect(arrowUps.length).toBe(1);
    });

    it('should check that it can return an down arrow icon if both icons openRow and closeRow is not there', () => {
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
            },
            icons: {
                closeRow: <span className="close" />,
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        const arrowDowns = wrapper.find('MdKeyboardArrowDown');

        expect(arrowDowns.length).toBe(1);
    });

    it('should check that it can find the custom close icon', () => {
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
            },
            icons: {
                openRow: <span className="open" />,
                closeRow: <span className="close" />,
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        const span = wrapper.find('span').last();

        expect(span.hasClass('close')).toBe(true);
    });

    it('should check that it can find the custom open icon', () => {
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
            },
            icons: {
                openRow: <span className="open" />,
                closeRow: <span className="close" />,
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        const span = wrapper.find('span').last();

        expect(span.hasClass('open')).toBe(true);
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
            expandRow: jest.fn(),
            icons: {
                openRow: <span className="open" />,
                closeRow: <span className="close" />,
            }
        };
        wrapper = shallow(actions.expandIcon(props));

        wrapper.find('span').first().simulate('click');

        expect(props.expandRow).toHaveBeenCalledWith({ rowIndex: 1 });
    });

    //Get Icons for the application
    it('should return an down arrow icon', () => {
        props = { name: 'OpenRow', icons: null };
        wrapper = shallow(actions.getIcon(props));
        const arrowDowns = wrapper.find('MdKeyboardArrowDown');

        expect(arrowDowns.length).toBe(1);
    });

    it('should return an up arrow icon', () => {
        props = { name: 'CloseRow', icons: null };
        wrapper = shallow(actions.getIcon(props));
        const arrowUps = wrapper.find('MdKeyboardArrowUp');

        expect(arrowUps.length).toBe(1);
    });

    it('should return an down caret icon', () => {
        props = { name: 'descending', icons: null };
        wrapper = shallow(actions.getIcon(props));
        const CaretDowns = wrapper.find('FaCaretDown');

        expect(CaretDowns.length).toBe(1);
    });

    it('should return an up caret icon', () => {
        props = { name: 'ascending', icons: null };
        wrapper = shallow(actions.getIcon(props));
        const CaretUps = wrapper.find('FaCaretUp');

        expect(CaretUps.length).toBe(1);
    });

    it('should return a left cheveron icon', () => {
        props = { name: 'leftChevron', icons: null };
        wrapper = shallow(actions.getIcon(props));
        const chevronLefts = wrapper.find('FaChevronLeft');

        expect(chevronLefts.length).toBe(1);
    });

    it('should return a right chevron icon', () => {
        props = { name: 'rightChevron', icons: null };
        wrapper = shallow(actions.getIcon(props));
        const chevronRights = wrapper.find('FaChevronRight');

        expect(chevronRights.length).toBe(1);
    });

    it('should return no icons', () => {
        props = { icons: null };
        wrapper = shallow(actions.getIcon(props));

        const arrowUps = wrapper.find('MdKeyboardArrowUp');
        const arrowDowns = wrapper.find('MdKeyboardArrowDown');
        const CaretUps = wrapper.find('FaCaretUp');
        const CaretDowns = wrapper.find('FaCaretUp');
        const chevronLefts = wrapper.find('FaChevronLeft');
        const chevronRights = wrapper.find('FaChevronRight');

        expect(chevronRights.length).toBe(0);
        expect(chevronLefts.length).toBe(0);
        expect(CaretDowns.length).toBe(0);
        expect(CaretUps.length).toBe(0);
        expect(arrowDowns.length).toBe(0);
        expect(arrowUps.length).toBe(0);
    });

    it('should be able to call the on click funtion', () => {
        props = { name: 'OpenRow', onClick: jest.fn(), icons: null };
        wrapper = shallow(actions.getIcon(props));

        wrapper.find('MdKeyboardArrowDown').simulate('click');

        expect(props.onClick).toHaveBeenCalled;
    });
});
