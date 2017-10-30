//React
import React from 'react';
//Component
import Search from '../../components/table/Search';
//Testing
import { shallow, } from 'enzyme';

describe('Search', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {

            actions: {
                searchRows: jest.fn(),
                clearSearch: jest.fn(),
                resizeSearch: jest.fn(),
            }
        };

        wrapper = shallow(<Search { ...props } />);
    });

    it('should have 1 input field', () => {
        const inputs = wrapper.find('input');

        expect(inputs.length).toBe(1);
    });

    it('should have a clear button and a resize button', () => {
        const buttons = wrapper.find('button');

        expect(buttons.length).toBe(2);
    });

    it('should call the clear search field action', () => {
        wrapper.find('button').first().simulate('click');

        expect(props.actions.clearSearch).toHaveBeenCalled();
    });

    it('should call the search row action', () => {
        wrapper.find('input').first().simulate('change', { target: { value: 2 } });

        expect(props.actions.searchRows).toHaveBeenCalledWith({ target: { value: 2 } });
    });
});
