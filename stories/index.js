import React from 'react';

import { storiesOf } from '@storybook/react';

import ReactCollapsingTable from '../src/index';
import {
    basicTableProps,
    basicTablePropsPaginationAndSearchShow,
    sortColumnAndDirectionProps,
    rowSizeProps,
    customComponentProps,
} from './props';


storiesOf('React Collapsing Table', module)
    .add('Basic Table', () => <ReactCollapsingTable {...basicTableProps} />)
    .add('Turn Pagination and Search On', () => <ReactCollapsingTable {...basicTablePropsPaginationAndSearchShow } />)
    .add('Set Column and Direction displayed on load', () => <ReactCollapsingTable {...sortColumnAndDirectionProps} />)
    .add('Set the total rows displayed', () => <ReactCollapsingTable {...rowSizeProps} />)
    .add('Set the a custom component and callback', () => <ReactCollapsingTable {...customComponentProps} />);
