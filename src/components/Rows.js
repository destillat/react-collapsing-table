//React
import React from 'react';
import { array, arrayOf, string, shape } from 'prop-types';
//Components
import Row from './Row';

const Rows = ({rows, visibleColumns, hiddenColumns }) => {
    const tableRows = rows.map((row, index) => {
        return <Row key={ index }
                    row={ row }
                    visibleColumns={ visibleColumns } />
    });

    return (
        <tbody>
            { tableRows }
        </tbody>
    );
};

Rows.PropTypes = {
  rows: array.isRequierd,
  columns: arrayOf(shape({
    accessor: string.isRequired,
    label: string.isRequired,
  }))
};

export default Rows
