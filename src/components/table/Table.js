//React
import React from 'react';
import {} from 'prop-types'
//Components
import Columns from './Columns';
import Rows from './Rows';

const Table = ({ table, actions }) => {
    const { displayedRows, currentPageNumber, columns } = table;

    return (
        <div>
            <table>
                <Columns columns={ columns } onClick={ actions.sortColumn }/>
                <Rows rows={ displayedRows } columns={ columns } />
            </table>
            <button onClick={ actions.previousPage }>prev</button>
            <p>{ currentPageNumber }</p>
            <button onClick={ actions.nextPage }>next</button>
        </div>
    );
};

Table.PropTypes = {};

export default Table
