//React
import React from 'react';
import { object, arrayOf, shape, string } from 'prop-types';
//Components

const ExpandedRow = ({ row, columns, }) => {
    const something = columns.map(({ accessor, label }) => {
        return <p>{ label }: { row[accessor] }</p>
    });

    return (
        <td>
            { something }
        </td>
    );
};

ExpandedRow.PropTypes = {
    row: object.isRequired,
    columns: arrayOf(shape({
        accessor: string.isRequired,
        label: string.isRequired,
    }))
};

export default ExpandedRow