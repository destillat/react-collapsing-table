//React
import React from 'react';
import { array, arrayOf, shape, string, number, func } from 'prop-types';
//Components
import Columns from './Columns';
import Rows from './Rows';

const Table = ({ table, }) => {
    const {
        rows: { displayed, },
        columns: { visible, hidden },
    } = table;

    return (
        <div>
            <table className="react-collapsible">
                <Columns columns={ visible }/>
                <Rows rows={ displayed }
                      visibleColumns={ visible } />
            </table>
        </div>
    );
};

Table.PropTypes = {
    table: shape({
        rows: shape({
            displayed: array.isRequierd,
        }),
        columns: shape({
            visible: arrayOf(shape({
                accessor: string.isRequired,
                label: string.isRequired,
            })),
            hidden: arrayOf(shape({
                accessor: string.isRequired,
                label: string.isRequired,
            })),
        }),
        pagination: shape({
            currentPage: number.isRequierd,
        }),
        globalSearchString: string.isRequierd,
    }),
    actions: shape({
        nextPage: func.isRequired,
        previousPage: func.isRequired,
        sortColumn: func.isRequired,
        searchRows: func.isRequired,
        clearSearch: func.isRequired,
        expandRow: func.isRequired,
        resizeTable: func.isRequired,
    })
};

export default Table
