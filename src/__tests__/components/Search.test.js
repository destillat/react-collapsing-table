//React
import React from 'react';
//Component
import Search from '../../components/Search';
//Testing
import { shallow, } from 'enzyme';

describe('Search', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            searchRows: jest.fn(),
            clearSearch: jest.fn(),
            searchString: '',
        };

        wrapper = shallow(<Search { ...props } />);
    });

    it('should have 1 input field', () => {
        const inputs = wrapper.find('input');

        expect(inputs.length).toBe(1);
    });

    it('should have a clear button', () => {
        const buttons = wrapper.find('button');

        expect(buttons.length).toBe(1);
    });

    it('should call the clear search field action', () => {
        wrapper.find('button').first().simulate('click');

        expect(props.clearSearch).toHaveBeenCalled();
    });

    it('should call the search row action', () => {
        wrapper.find('input').first().simulate('change', { target: { value: 2 } });

        expect(props.searchRows).toHaveBeenCalledWith({ target: { value: 2 } });
    });
});
