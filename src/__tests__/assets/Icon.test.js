//React
import React from 'react';
//Component
import * as actions from '../../assets/icons/Icon';
//Testing
import { shallow, } from 'enzyme';

describe('Icon', () => {
    let wrapper, props;

    it('should ', () => {
        props = { direction: 'ascending' };
        wrapper = shallow(actions.columnDirection({ ...props }));
        const ths = wrapper.find('th');

        expect(ths.length).toBe(1);
    });
});
