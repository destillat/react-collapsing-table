//React
import React from 'react';
//Component
import Pagination from '../../components/table/Pagination';
//Testing
import { shallow, } from 'enzyme';

describe('Pagination', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            currentPage: 3,
            actions: {
                nextPage: jest.fn(),
                previousPage: jest.fn(),
            }
        };

        wrapper = shallow(<Pagination { ...props } />);
    });

    it('should display the currentPage', () => {
        const currentPageNumber = wrapper.find('p').text();

        expect(currentPageNumber).toBe('3');
    });

    it('should call the last page action', () => {
        wrapper.find('button').first().simulate('click');

        expect(props.actions.previousPage).toHaveBeenCalled();
    });
    it('should call the next page action', () => {
        wrapper.find('button').last().simulate('click');

        expect(props.actions.nextPage).toHaveBeenCalled();
    });
});
