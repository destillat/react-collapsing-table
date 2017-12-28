//React
import React from 'react';
//Component
import Cell from '../../components/Cell';
import Button from '../../testUtils/components/Button';
//Testing
import { shallow, } from 'enzyme';
import jsc from 'jsverify'

describe('Cell', () => {
    jsc.property('should render 1 table cell', 'string', 'string', 'nat', 'nat', 'nat', (name, value, cellIndex, rowIndex, hiddenColumnsLength) => {
        const props = {
            row: {
                [name]: value,
            },
            accessor: name,
            cellIndex,
            rowIndex,
            expandRow: jest.fn(),
            hiddenColumnsLength,
        };

        const wrapper = shallow(<Cell { ...props } />);

        const tds = wrapper.find('td');

        return tds.length === 1
    });

    jsc.property('should find the value rendered in the string', 'string', 'string', 'nat', 'nat', 'nat', (name, value, cellIndex, rowIndex, hiddenColumnsLength) => {
        const props = {
            row: {
                [name]: value,
            },
            accessor: name,
            cellIndex,
            rowIndex,
            expandRow: jest.fn(),
            hiddenColumnsLength,
        };

        const wrapper = shallow(<Cell { ...props } />);

        const [ icon, content ] = wrapper.find('span');

        return content.props.dangerouslySetInnerHTML.__html === value
    });

    jsc.property('should render 1 custom component', 'string', 'string', 'nat', 'nat', 'nat', (name, value, cellIndex, rowIndex, hiddenColumnsLength) => {
        const props = {
            row: {
                [name]: value,
            },
            accessor: name,
            cellIndex,
            rowIndex,
            expandRow: jest.fn(),
            hiddenColumnsLength,
            CustomComponent: Button,
            CustomFunction: jest.fn,
        };

        const wrapper = shallow(<Cell { ...props } />);

        const customComponents = wrapper.find('Button');

        return customComponents.length === 1;
    });
});
