//React
import React from 'react';
import { object, arrayOf, string, shape } from 'prop-types';
//Components
import Cell from './Cell';
import ExpandedRow from './ExpandedRow';
import '../../assets/styles/react-table.css';

const Row = ({ row, visibleColumns, hiddenColumns, actions, rowIndex }) => {
    const hiddenColumnsLength = hiddenColumns.length;
    const cells = visibleColumns.map(({ accessor }, index) => {
        return <Cell key={ accessor }
                     row={ row }
                     accessor={ accessor }
                     rowIndex={ rowIndex }
                     cellIndex={ index }
                     hiddenColumnsLength={ hiddenColumnsLength }
                     actions={ actions } />
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

Row.PropTypes = {
    row: object.isRequired,
    columns: arrayOf(shape({
        accessor: string.isRequired,
        label: string.isRequired,
    }))
};

export default Row
