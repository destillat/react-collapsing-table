//React
import React from 'react';
import { RowsPropType } from '../utils/propTypes';
//Components
import Row from './Row';
import ExpandedRow from './ExpandedRow';

const Rows = ({ rows, visibleColumns, hiddenColumns, expandRow, callbacks }) => {
    const tableRows = rows.reduce((r, row, index) => r.concat(
        <Row key={ `${index}-1` }
             rowIndex={ index }
             row={ row }
             visibleColumns={ visibleColumns }
             hiddenColumns={ hiddenColumns }
             callbacks={ callbacks }
             expandRow={ expandRow } />,
        row.isOpen ? <ExpandedRow key={ `${index}-2` }
                     row={ row }
                     columns={ hiddenColumns }
                     callbacks={ callbacks }
                     colspan={ visibleColumns.length } /> : null), []);

    return (
        <tbody>
        { tableRows }
        </tbody>
    );
};

Rows.propTypes = RowsPropType;

export default Rows
