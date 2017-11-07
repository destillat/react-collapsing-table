//React
import React from 'react';
import { object, arrayOf, shape, string } from 'prop-types';
//Components

const ExpandedRow = ({ row, columns, colspan }) => {
    const listOfHiddenAttributes = columns.map(({ accessor, label }) => {
        return <p className="child-cell" key={ accessor }>
                  <span className="child-label">{ label }</span>
                  <span className="child-content"> { row[accessor] }</span>
               </p>
    });

    return (
        <td colspan={ colspan }>
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
