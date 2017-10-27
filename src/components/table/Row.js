//React
import React from 'react';
import { object, arrayOf, string, shape } from 'prop-types';
//Components
import Cell from './Cell';
import ExpandedRow from './ExpandedRow';

const Row = ({row, columns}) => {
    const cells = columns.map(({ accessor }) => {
        return <Cell key={ accessor } row={ row } accessor={ accessor } />
    });

    return (
        [
            <tr>
                { cells }
            </tr>,
            <tr>
                <ExpandedRow row={ row } columns={ columns }/>
            </tr>
        ]
    );
};

Row.PropTypes = {
    row: object.isRequired,
    columns: arrayOf(shape({
        accessor: string.isRequired,
        label: string.isRequired,
    }))
};

export default Row
