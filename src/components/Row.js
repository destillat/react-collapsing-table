//React
import React from 'react';
import { object, arrayOf, string, shape } from 'prop-types';
//Components
import Cell from './Cell';
import ExpandedRow from './ExpandedRow';

const Row = ({ row, visibleColumns, hiddenColumns, expandRow, rowIndex }) => {
    const hiddenColumnsLength = hiddenColumns.length;

    const cells = visibleColumns.map(({ accessor }, index) => {
        return <Cell key={ accessor }
                     row={ row }
                     rowIndex={ rowIndex }
                     cellIndex={ index }
                     accessor={ accessor }
                     expandRow={ expandRow }
                     hiddenColumnsLength={ hiddenColumnsLength } />
    });
    console.log(row);
    const expandedRow = row.isOpen ?
        <tr className="expanded-row" key='expandedRow'>
            <ExpandedRow row={ row }
                         columns={ hiddenColumns }
                         colspan={ visibleColumns.length } />
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
