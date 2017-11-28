//React
import React from 'react';
import { RowPropType } from '../utils/propTypes';
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

Row.propTypes = RowPropType;

export default Row
