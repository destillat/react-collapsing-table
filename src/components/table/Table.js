//React
import React from 'react';
import {} from 'prop-types'
//Components
import Columns from './Columns';
import Rows from './Rows';

const Table = ({ data, columns }) => {

    return (
        <table>
            <Columns columns={ columns } />
            <Rows rows={ data } columns={ columns } />
        </table>
    );
};

Table.PropTypes = {};

export default Table
