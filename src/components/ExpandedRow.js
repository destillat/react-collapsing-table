//React
import React from 'react';
import { ExpandedRowPropType } from '../utils/propTypes';
//Components

const ExpandedRow = ({ row, columns, colspan, callbacks }) => {
    const listOfHiddenAttributes = columns.map(({ accessor, CustomComponent, label }) => {
        const content = CustomComponent === undefined
                        ? <span className="child-content" dangerouslySetInnerHTML={{ __html: row[accessor] }} />
                        : <span className="child-content">
                            <CustomComponent row={ row }
                                             accessor={ accessor }
                                             CustomFunction={ callbacks[accessor] }/>
                         </span>;
        return <p className="child-cell" key={ accessor }>
                  <span className="child-label">{ label }</span>
                  { content }
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
