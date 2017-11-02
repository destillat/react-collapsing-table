//React
import React from 'react';
import { object, arrayOf, shape, string } from 'prop-types';
//Components

const ExpandedRow = ({ row, columns, }) => {
    const listOfHiddenAttributes = columns.map(({ accessor, label }) => {
        return <p key={ accessor }>{ label }: { row[accessor] }</p>
    });

    return (
        <td colspan="4">
            { listOfHiddenAttributes }
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
