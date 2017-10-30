//React
import React from 'react';
import { array, arrayOf, shape, string, func } from 'prop-types'
//Components
import Columns from './Columns';
import Rows from './Rows';

const Table = ({ table, actions }) => {
    const { displayedRows, currentPageNumber, columns } = table;

    return (
        <div>
            <input onChange={ actions.searchRows } />
            <button onClick={ actions.clearSearch }>Clear</button>
            <table>
                <Columns columns={ columns } onClick={ actions.sortColumn }/>
                <Rows rows={ displayedRows } columns={ columns } actions={ actions }/>
            </table>
            <button onClick={ actions.previousPage }>prev</button>
            <p>{ currentPageNumber }</p>
            <button onClick={ actions.nextPage }>next</button>
        </div>
    );
};

Table.PropTypes = {
    rows: array.isRequierd,
    columns: arrayOf(shape({
        accessor: string.isRequired,
        label: string.isRequired,
    })),
    actions: shape({
        sortColumn: func.isRequired,
        previousPage: func.isRequired,
        nextPage: func.isRequired,
    })
};

export default Table
