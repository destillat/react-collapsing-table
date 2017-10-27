//React
import React from 'react';
import { object, arrayOf, string, shape } from 'prop-types';
//Components
import Cell from './Cell';
import ExpandedRow from './ExpandedRow';

const Row = ({ row, columns, actions, rowIndex }) => {
    const cells = columns.map(({ accessor }, index) => {
        return <Cell key={ accessor }
                     row={ row }
                     accessor={ accessor }
                     rowIndex={ rowIndex }
                     cellIndex={ index }
                     actions={ actions } />
    });

    const expandedRow = row.isOpen ?
        <tr key='expandedRow'>
            <ExpandedRow row={ row } columns={ columns }/>
        </tr> : null;

    return (
        [
            <tr key='normalRow'>
                { cells }
            </tr>,
            expandedRow
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
