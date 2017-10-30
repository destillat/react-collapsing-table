//React
import React from 'react';
import { array, arrayOf, shape, string, number, func } from 'prop-types';
//Components
import Search from './Search';
import Columns from './Columns';
import Rows from './Rows';
import Pagination from './Pagination';

const Table = ({ table, actions }) => {
    const {
        rows: { displayed },
        pagination: { currentPage },
        columns: { visible, hidden },
        globalSearchString,
    } = table;

    return (
        <div>
            <Search searchString={ globalSearchString } actions={ actions } />
            <table>
                <Columns columns={ visible } onClick={ actions.sortColumn }/>
                <Rows rows={ displayed } columns={ visible } actions={ actions }/>
            </table>
            <Pagination currentPage={ currentPage } actions={ actions }/>
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
