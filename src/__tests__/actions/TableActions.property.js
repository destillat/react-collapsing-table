import * as actions from '../../actions/TableActions';
import jsc from "jsverify/lib/jsverify";

describe('Table Actions', () => {
    //CALCULATE ROWS
    jsc.property('should return the expected numbed of rows for page 1',
        'nat', 'array', (rowSize, rows) => {
            const given = {
                state: {
                    rows,
                    pagination: {
                        currentPage: 1,
                        rowSize,
                    }
                }
            };

            const output = actions.calculateRows(given);

            return output.length === rowSize || // If there are more rows does it return the max rows?
                (rows.length === 0 && output.length === 0 )|| // If there are no rows does it return an empty array?
                (rowSize > rows.length && rows.length === output.length) // If there are less rows than the row size does it return all of the rows?
        }
    );

    jsc.property('should return the expected numbed of rows for any page',
        'nat', 'nat', 'array', (rowSize, currentPage, rows) => {
            const given = {
                state: {
                    rows,
                    pagination: {
                        currentPage,
                        rowSize,
                    }
                }
            };

            const output = actions.calculateRows(given);

            return output.length === rowSize || // If there are more rows than the currentPage * rowSize return an array of the rowSize
                (currentPage < 1 && output.length === 0) || //If the page is less than 0 then does it return an empty array?
                (rows.length === 0 && output.length === 0 ) ||  // If there are no rows does it return an empty array?
                (rowSize > rows.length && rows.length === output.length) || // If there are less rows than the row size does it return all of the rows?
                (rows.length <= ((currentPage - 1) * rowSize) && output.length === 0) || //If there are only the same number of rows as the starting point of the slice does it return an empty array?
                (rows.length < (currentPage * rowSize) && output.length === ((currentPage * rowSize) - rows.length%rowSize)) //If there are less rows than the ending point of the slice does it return the correct number of rows based on the difference?
        }
    );


    //SORT COLUMN
    // jsc.property('should ',
    //     'string', 'nat', 'array', (column, currentPage, rows) => {
    //         const given = {
    //             column: 'firstName',
    //             state: {
    //                 sort: {
    //                     direction: 'none',
    //                     column: 'firstName',
    //                 },
    //                 rows: [
    //                     {firstName: 'Paul', email: 'p@gmail.com'},
    //                     {firstName: 'Adam', email: 'd@gmail.com'},
    //                     {firstName: 'Matt', email: 'm@gmail.com'},
    //                     {firstName: 'Matt', email: 'a@gmail.com'},
    //                 ],
    //                 columns: [
    //                     {accessor: 'firstName',},
    //                     {accessor: 'email',},
    //                 ],
    //             }
    //         };
    //         const expected = {
    //             sort: {
    //                 direction: 'ascending',
    //                 column: 'firstName',
    //             },
    //             rows: [
    //                 {firstName: 'Adam', email: 'd@gmail.com'},
    //                 {firstName: 'Matt', email: 'm@gmail.com'},
    //                 {firstName: 'Matt', email: 'a@gmail.com'},
    //                 {firstName: 'Paul', email: 'p@gmail.com'},
    //             ],
    //             columns: [
    //                 {accessor: 'firstName',},
    //                 {accessor: 'email',},
    //             ],
    //         };
    //         const output = actions.sortColumn(given);
    //     }
    // );

    //CHANGE SORT FIELD AND DIRECTION
    // jsc.property('should ',
    //     'string', 'nat', 'array', (column, currentPage, rows) => {
    //         const given = {
    //             newColumn: 'firstName',
    //             state: {
    //                 sort: {
    //                     direction: 'none',
    //                     column: 'firstName',
    //                 }
    //             }
    //         };
    //
    //         const expected = {
    //             sortedColumn: 'firstName',
    //             sortedDirection: 'ascending'
    //         };
    //         const output = actions.changeSortFieldAndDirection(given);
    //     }
    // );

    //CHANGE ROW ORDER
    // jsc.property('should ',
    //     'string', 'nat', 'array', (column, currentPage, rows) => {
    //             const given = {
    //                 column: 'firstName',
    //                 state: {
    //                     rows: [
    //                         { firstName: 'Paul', email: 'p@gmail.com' },
    //                         { firstName: 'Adam', email: 'd@gmail.com' },
    //                         { firstName: 'Matt', email: 'm@gmail.com' },
    //                         { firstName: 'Matt', email: 'a@gmail.com' },
    //                     ],
    //                     sort: {
    //                         direction: 'ascending',
    //                     },
    //                     columns: [
    //                         { accessor: 'firstName', },
    //                         { accessor: 'email', },
    //                     ],
    //                 }
    //             };
    //             const expected = {
    //                 sortedRows: [
    //                     { firstName: 'Adam', email: 'd@gmail.com' },
    //                     { firstName: 'Matt', email: 'm@gmail.com' },
    //                     { firstName: 'Matt', email: 'a@gmail.com' },
    //                     { firstName: 'Paul', email: 'p@gmail.com' },
    //                 ]
    //             };
    //         const output = actions.changeRowOrder(given);
    //     }
    // );

    //Pagination
    jsc.property('should always increment the current page by one',
        'nat', (currentPage) => {
            const given = {
                state: {
                    pagination: {
                        currentPage,
                    },
                }
            };

            const expected = {
                pagination: {
                    currentPage: currentPage + 1,
                },
            };

            const output = actions.nextPage(given);

            return output.pagination.currentPage === expected.pagination.currentPage
        }
    );

    jsc.property('should always decrement the current page by one',
        'nat', (currentPage) => {
            const given = {
                state: {
                    pagination: {
                        currentPage,
                    },
                }
            };

            const expected = {
                pagination: {
                    currentPage: currentPage - 1,
                },
            };

            const output = actions.previousPage(given);

            return output.pagination.currentPage === expected.pagination.currentPage
        }
    );

    //EXPAND OR HIDE ROW
    // jsc.property('should ',
    //     'array', 'nat', (generatedRows, rowIndex) => {
    //         const rows = generatedRows.map(row => { return { ...row, isOpen: Math.random() >= 0.5 } });
    //         const given = {
    //                     rowIndex,
    //                     state: {
    //                         pagination: {
    //                             currentPage: 1,
    //                             rowSize: 15,
    //                         },
    //                         rows
    //                     }
    //                 };
    //
    //
    //         const output = actions.expandRow(given);
    //         console.log('row index', rowIndex);
    //         console.log('output', output.rows[rowIndex]);
    //         console.log('rows', rows[rowIndex], rows.length);
    //
    //         return rows.length === 0 ||
    //
    //             output.rows[rowIndex].isOpen !== rows[rowIndex].isOpen
    //     }
    // );
});
