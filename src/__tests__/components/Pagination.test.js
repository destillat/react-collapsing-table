//React
import React from 'react';
//Component
import Pagination from '../../components/Pagination';
//Testing
import { shallow, } from 'enzyme';

describe('Pagination', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            currentPage: 3,
            totalPages: 4,
            nextPage: jest.fn(),
            previousPage: jest.fn(),
        };

        wrapper = shallow(<Pagination { ...props } />);
    });

    it('should display the page with both arrows', () => {
        const chevronLefts = wrapper.find('FaChevronLeft');
        const chevronRights = wrapper.find('FaChevronRight');

        expect(chevronLefts.length).toBe(1);
        expect(chevronRights.length).toBe(1);
    });

    it('should not display 0 as the total number of pages', () => {
        props = { ...props, currentPage: 1, totalPages: 1 };
        wrapper = shallow(<Pagination { ...props } />);

        const content = wrapper.find('p').first().text();

        expect(content).toBe('Page 1 of 1');
    });

    it('should display the page with only the next arrows', () => {
        props = {
            currentPage: 1,
            totalPages: 2,
            nextPage: jest.fn(),
            previousPage: jest.fn(),
        };

        wrapper = shallow(<Pagination { ...props } />);
        const chevronLefts = wrapper.find('FaChevronLeft');
        const chevronRights = wrapper.find('FaChevronRight');

        expect(chevronLefts.length).toBe(0);
        expect(chevronRights.length).toBe(1);
    });

    it('should display the page with only the next arrows', () => {
        props = {
            currentPage: 2,
            totalPages: 2,
            nextPage: jest.fn(),
            previousPage: jest.fn(),
        };

        wrapper = shallow(<Pagination { ...props } />);
        const chevronLefts = wrapper.find('FaChevronLeft');
        const chevronRights = wrapper.find('FaChevronRight');

        expect(chevronLefts.length).toBe(1);
        expect(chevronRights.length).toBe(0);
    });

    it('should call the last page action', () => {
        wrapper.find('FaChevronLeft').first().simulate('click');

        expect(props.previousPage).toHaveBeenCalled();
    });
    it('should call the next page action', () => {
        wrapper.find('FaChevronRight').last().simulate('click');

        expect(props.nextPage).toHaveBeenCalled();
    });
});
