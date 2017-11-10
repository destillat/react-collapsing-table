//React
import React from 'react';
import { object, arrayOf, string, shape } from 'prop-types';
//Components
import Cell from './Cell';

const Row = ({ row, visibleColumns }) => {
    const cells = visibleColumns.map(({ accessor }, index) => {
        return <Cell key={ accessor }
                     row={ row }
                     accessor={ accessor } />
    });

    return (
        [
            <tr key='normalRow'>
                { cells }
            </tr>,
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
