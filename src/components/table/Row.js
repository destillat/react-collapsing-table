//React
import React from 'react';
import { object, arrayOf, string, shape } from 'prop-types';
//Components
import Cell from './Cell';

const Row = ({row, columns}) => {
    const cells = columns.map(({ accessor }) => {
        return <Cell key={ accessor } row={ row } accessor={ accessor } />
    });
    return (
        <tr>
            { cells }
        </tr>
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
