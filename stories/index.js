import React from 'react';

import { storiesOf } from '@storybook/react';

import ReactCollapsingTable from '../src/index';
import {
  basicTableProps,
    basicTablePropsPaginationAndSearchShow,
  sortColumnAndDirectionProps,
  tonsofDataProps,
  rowSizeProps,
  customComponentProps,
} from './props';


storiesOf('React Collapsing Table', module)
  .add('Basic Table', () => <ReactCollapsingTable {...basicTableProps} />)
  .add('Set Pagination and Search', () => <ReactCollapsingTable {...basicTablePropsPaginationAndSearchShow } />)
  .add('Set Column and Direction for initial load of Table', () => <ReactCollapsingTable {...sortColumnAndDirectionProps} />)
  .add('Set the total rows displayed for initial load of Table', () => <ReactCollapsingTable {...rowSizeProps} />)
  .add('Set the a custom component for initial load of Table', () => <ReactCollapsingTable {...customComponentProps} />);
