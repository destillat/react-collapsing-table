//React
import React from 'react';
import { ExpandedRowPropType } from '../utils/propTypes';
//Components

const ExpandedRow = ({ row, columns, colspan }) => {
    const listOfHiddenAttributes = columns.map(({ accessor, label }) => {
        return <p className="child-cell" key={ accessor }>
                  <span className="child-label">{ label }</span>
                  <span className="child-content" dangerouslySetInnerHTML={{ __html: row[accessor] }} />
               </p>
    });

    return (
        <td colSpan={ colspan }>
            { listOfHiddenAttributes }
        </td>
    );
};

ExpandedRow.propTypes = ExpandedRowPropType;

export default ExpandedRow
