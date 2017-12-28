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
                (rows.length < (currentPage * rowSize) && output.length === ((currentPage * rowSize) - rows.length)) //If there are less rows than the ending point of the slice does it return the correct number of rows based on the difference?
        }
    );


    // //SORT COLUMN
    // it('should return ascending if the new column matches the old column and there was no previous sort direction', () => {
    //     const given = {
    //         column: 'firstName',
    //         state: {
    //             sort: {
    //                 direction: 'none',
    //                 column: 'firstName',
    //             },
    //             rows: [
    //                 { firstName: 'Paul', email: 'p@gmail.com' },
    //                 { firstName: 'Adam', email: 'd@gmail.com' },
    //                 { firstName: 'Matt', email: 'm@gmail.com' },
    //                 { firstName: 'Matt', email: 'a@gmail.com' },
    //             ],
    //             columns: [
    //                 { accessor: 'firstName', },
    //                 { accessor: 'email', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         sort: {
    //             direction: 'ascending',
    //             column: 'firstName',
    //         },
    //         rows: [
    //             { firstName: 'Adam', email: 'd@gmail.com' },
    //             { firstName: 'Matt', email: 'm@gmail.com' },
    //             { firstName: 'Matt', email: 'a@gmail.com' },
    //             { firstName: 'Paul', email: 'p@gmail.com' },
    //         ],
    //         columns: [
    //             { accessor: 'firstName', },
    //             { accessor: 'email', },
    //         ],
    //     };
    //
    //     expect(actions.sortColumn(given)).toEqual(expected);
    // });
    // //CHANGE SORT FIELD AND DIRECTION
    // it('should return ascending if the new column matches the old column and there was no previous sort direction', () => {
    //     const given = {
    //         newColumn: 'firstName',
    //         state: {
    //             sort: {
    //                 direction: 'none',
    //                 column: 'firstName',
    //             }
    //         }
    //     };
    //     const expected = {
    //         sortedColumn: 'firstName',
    //         sortedDirection: 'ascending'
    //     };
    //
    //     expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    // });
    //
    // it('should return descending if the new column matches the old column and there was the previous sort direction was ascending', () => {
    //     const given = {
    //         newColumn: 'firstName',
    //         state: {
    //             sort: {
    //                 direction: 'ascending',
    //                 column: 'firstName',
    //             }
    //         }
    //     };
    //     const expected = {
    //         sortedColumn: 'firstName',
    //         sortedDirection: 'descending'
    //     };
    //
    //     expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    // });
    //
    // it('should return ascending if the new column matches the old column and there was the previous sort direction was descending', () => {
    //     const given = {
    //         newColumn: 'firstName',
    //         state: {
    //             sort: {
    //                 direction: 'descending',
    //                 column: 'firstName',
    //             }
    //         }
    //     };
    //     const expected = {
    //         sortedColumn: 'firstName',
    //         sortedDirection: 'ascending',
    //     };
    //
    //     expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    // });
    //
    // it('should return none if the new column matches the old column and there was the previous sort direction was not defined', () => {
    //     const given = {
    //         newColumn: 'firstName',
    //         state: {
    //             sort: {
    //                 direction: 'EyeOfTheTiger',
    //                 column: 'firstName',
    //             }
    //         }
    //     };
    //     const expected = {
    //         sortedColumn: 'firstName',
    //         sortedDirection: 'none'
    //     };
    //
    //     expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    // });
    //
    // it('should return ascending if the new column does not match the old column', () => {
    //     const given = {
    //         newColumn: 'firstName',
    //         state: {
    //             sort: {
    //                 direction: 'ascending',
    //                 column: 'email',
    //             }
    //         }
    //     };
    //     const expected = {
    //         sortedColumn: 'firstName',
    //         sortedDirection: 'ascending'
    //     };
    //
    //     expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    // });
    // //CHANGE ROW ORDER
    // it('should return the rows listed in ascending order based on the column clicked', () => {
    //     const given = {
    //         column: 'firstName',
    //         state: {
    //             rows: [
    //                 { firstName: 'Paul', email: 'p@gmail.com' },
    //                 { firstName: 'Adam', email: 'd@gmail.com' },
    //                 { firstName: 'Matt', email: 'm@gmail.com' },
    //                 { firstName: 'Matt', email: 'a@gmail.com' },
    //             ],
    //             sort: {
    //                 direction: 'ascending',
    //             },
    //             columns: [
    //                 { accessor: 'firstName', },
    //                 { accessor: 'email', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         sortedRows: [
    //             { firstName: 'Adam', email: 'd@gmail.com' },
    //             { firstName: 'Matt', email: 'm@gmail.com' },
    //             { firstName: 'Matt', email: 'a@gmail.com' },
    //             { firstName: 'Paul', email: 'p@gmail.com' },
    //         ]
    //     };
    //
    //     expect(actions.changeRowOrder(given)).toEqual(expected);
    // });
    //
    // it('should return the rows listed in descending order based on the column clicked', () => {
    //     const given = {
    //         column: 'firstName',
    //         state: {
    //             rows: [
    //                 { firstName: 'Paul', email: 'p@gmail.com' },
    //                 { firstName: 'Adam', email: 'd@gmail.com' },
    //                 { firstName: 'Matt', email: 'm@gmail.com' },
    //                 { firstName: 'Matt', email: 'a@gmail.com' },
    //             ],
    //             sort: {
    //                 direction: 'descending',
    //             },
    //             columns: [
    //                 { accessor: 'firstName', },
    //                 { accessor: 'email', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         sortedRows: [
    //             { firstName: 'Paul', email: 'p@gmail.com' },
    //             { firstName: 'Matt', email: 'a@gmail.com' },
    //             { firstName: 'Matt', email: 'm@gmail.com' },
    //             { firstName: 'Adam', email: 'd@gmail.com' },
    //         ]
    //     };
    //
    //     expect(actions.changeRowOrder(given)).toEqual(expected);
    // });
    //
    // it('should return the rows listed in ascending order based on the column clicked if direction is not one of the described states', () => {
    //     const given = {
    //         column: 'firstName',
    //         state: {
    //             rows: [
    //                 { firstName: 'Paul', email: 'p@gmail.com' },
    //                 { firstName: 'Adam', email: 'd@gmail.com' },
    //                 { firstName: 'Matt', email: 'm@gmail.com' },
    //                 { firstName: 'Matt', email: 'a@gmail.com' },
    //             ],
    //             sort: {
    //                 direction: 'IAmALittleTeaPot',
    //             },
    //             columns: [
    //                 { accessor: 'firstName', },
    //                 { accessor: 'email', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         sortedRows: [
    //             { firstName: 'Adam', email: 'd@gmail.com' },
    //             { firstName: 'Matt', email: 'm@gmail.com' },
    //             { firstName: 'Matt', email: 'a@gmail.com' },
    //             { firstName: 'Paul', email: 'p@gmail.com' },
    //         ]
    //     };
    //
    //     expect(actions.changeRowOrder(given)).toEqual(expected);
    // });
    //
    // it('should return the rows listed in the same order if it is not sure of how to sort the columns', () => {
    //     const given = {
    //         column: 'IAmALittleTeaPot',
    //         state: {
    //             rows: [
    //                 { firstName: 'Paul', email: 'p@gmail.com' },
    //                 { firstName: 'Adam', email: 'd@gmail.com' },
    //                 { firstName: 'Matt', email: 'm@gmail.com' },
    //                 { firstName: 'Matt', email: 'a@gmail.com' },
    //             ],
    //             sort: {
    //                 direction: 'ascending',
    //             },
    //             columns: [
    //                 { accessor: 'firstName', },
    //                 { accessor: 'email', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         sortedRows: [
    //             { firstName: 'Paul', email: 'p@gmail.com' },
    //             { firstName: 'Adam', email: 'd@gmail.com' },
    //             { firstName: 'Matt', email: 'm@gmail.com' },
    //             { firstName: 'Matt', email: 'a@gmail.com' },
    //         ]
    //     };
    //
    //     expect(actions.changeRowOrder(given)).toEqual(expected);
    // });
    //
    // it('should order dates from newest to oldest', () => {
    //     const given = {
    //         column: 'date',
    //         state: {
    //             rows: [
    //                 { date: '12/30/2016', email: 'p@gmail.com' },
    //                 { date: '01/01/2017', email: 'd@gmail.com' },
    //                 { date: '12/31/2016', email: 'm@gmail.com' },
    //                 { date: '01/01/2016', email: 'a@gmail.com' },
    //             ],
    //             sort: {
    //                 direction: 'ascending',
    //             },
    //             columns: [
    //                 { accessor: 'date', sortType: 'date' },
    //                 { accessor: 'email', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         sortedRows: [
    //             { date: '01/01/2017', email: 'd@gmail.com' },
    //             { date: '12/31/2016', email: 'm@gmail.com' },
    //             { date: '12/30/2016', email: 'p@gmail.com' },
    //             { date: '01/01/2016', email: 'a@gmail.com' },
    //         ]
    //     };
    //
    //     expect(actions.changeRowOrder(given)).toEqual(expected);
    // });
    //
    // it('should order dates from oldest to newest', () => {
    //     const given = {
    //         column: 'date',
    //         state: {
    //             rows: [
    //                 { date: '12/30/2016', email: 'p@gmail.com' },
    //                 { date: '01/01/2017', email: 'd@gmail.com' },
    //                 { date: '12/31/2016', email: 'm@gmail.com' },
    //                 { date: '01/01/2016', email: 'a@gmail.com' },
    //             ],
    //             sort: {
    //                 direction: 'descending',
    //             },
    //             columns: [
    //                 { accessor: 'date', sortType: 'date' },
    //                 { accessor: 'email', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         sortedRows: [
    //             { date: '01/01/2016', email: 'a@gmail.com' },
    //             { date: '12/30/2016', email: 'p@gmail.com' },
    //             { date: '12/31/2016', email: 'm@gmail.com' },
    //             { date: '01/01/2017', email: 'd@gmail.com' },
    //         ]
    //     };
    //
    //     expect(actions.changeRowOrder(given)).toEqual(expected);
    // });
    //
    // it('should order dates from oldest to newest and handle the same date', () => {
    //     const given = {
    //         column: 'date',
    //         state: {
    //             rows: [
    //                 { date: '12/30/2016', email: 'p@gmail.com' },
    //                 { date: '01/01/2017', email: 'd@gmail.com' },
    //                 { date: '12/30/2016', email: 'm@gmail.com' },
    //                 { date: '01/01/2016', email: 'a@gmail.com' },
    //             ],
    //             sort: {
    //                 direction: 'descending',
    //             },
    //             columns: [
    //                 { accessor: 'date', sortType: 'date' },
    //                 { accessor: 'email', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         sortedRows: [
    //             { date: '01/01/2016', email: 'a@gmail.com' },
    //             { date: '12/30/2016', email: 'm@gmail.com' },
    //             { date: '12/30/2016', email: 'p@gmail.com' },
    //             { date: '01/01/2017', email: 'd@gmail.com' },
    //         ]
    //     };
    //
    //     expect(actions.changeRowOrder(given)).toEqual(expected);
    // });
    //
    // //Pagination
    // it('should update the currentPage to the next page', () => {
    //     const given = {
    //         state: {
    //             pagination: {
    //                 currentPage: 2,
    //                 rowSize: 15,
    //             },
    //         }
    //     };
    //     const expected = {
    //         pagination: {
    //             currentPage: 3,
    //             rowSize: 15,
    //         },
    //     };
    //
    //     expect(actions.nextPage(given)).toEqual(expected);
    // });
    //
    // it('should update the currentPage to the previous page', () => {
    //     const given = {
    //         state: {
    //             pagination: {
    //                 currentPage: 2,
    //                 rowSize: 15,
    //             },
    //         }
    //     };
    //     const expected = {
    //         pagination: {
    //             currentPage: 1,
    //             rowSize: 15,
    //         },
    //     };
    //
    //     expect(actions.previousPage(given)).toEqual(expected);
    // });
    //
    // it('should call the event pagination event listener', () => {
    //     const paginationEventListener = jest.fn();
    //     const given = {
    //         state: {
    //             pagination: {
    //                 currentPage: 2,
    //                 rowSize: 15,
    //             },
    //             paginationEventListener,
    //         },
    //         currentPage: 3,
    //     };
    //     const expected = {
    //         pagination: {
    //             currentPage: 3,
    //             rowSize: 15,
    //         },
    //     };
    //
    //     actions.changePage(given);
    //     expect(paginationEventListener).toHaveBeenCalledWith(expected);
    // });
    //
    // //EXPAND OR HIDE ROW
    // it('should hide a shown row', () => {
    //     const given = {
    //         rowIndex: 1,
    //         state: {
    //             pagination: {
    //                 currentPage: 1,
    //                 rowSize: 15,
    //             },
    //             rows: [
    //                 { isOpen: false, firstName: 'Paul', },
    //                 { isOpen: true, firstName: 'Matt', },
    //                 { isOpen: false, firstName: 'Michelle', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         pagination: {
    //             currentPage: 1,
    //             rowSize: 15,
    //         },
    //         rows: [
    //             { isOpen: false, firstName: 'Paul', },
    //             { isOpen: false, firstName: 'Matt', },
    //             { isOpen: false, firstName: 'Michelle', },
    //         ],
    //     };
    //
    //     expect(actions.expandRow(given)).toEqual(expected);
    // });
    //
    // it('should show a hidden row', () => {
    //     const given = {
    //         rowIndex: 2,
    //         state: {
    //             pagination: {
    //                 currentPage: 1,
    //                 rowSize: 15,
    //             },
    //             rows: [
    //                 { isOpen: false, firstName: 'Paul', },
    //                 { isOpen: true, firstName: 'Matt', },
    //                 { isOpen: false, firstName: 'Michelle', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         pagination: {
    //             currentPage: 1,
    //             rowSize: 15,
    //         },
    //         rows: [
    //             { isOpen: false, firstName: 'Paul', },
    //             { isOpen: true, firstName: 'Matt', },
    //             { isOpen: true, firstName: 'Michelle', },
    //         ],
    //     };
    //
    //     expect(actions.expandRow(given)).toEqual(expected);
    // });
    //
    // it('should show a hidden row on a different page', () => {
    //     const given = {
    //         rowIndex: 0,
    //         state: {
    //             pagination: {
    //                 currentPage: 2,
    //                 rowSize: 5,
    //             },
    //             rows: [
    //                 { isOpen: false, firstName: 'Paul', },
    //                 { isOpen: true, firstName: 'Matt', },
    //                 { isOpen: false, firstName: 'Michelle', },
    //                 { isOpen: false, firstName: 'Walter', },
    //                 { isOpen: true, firstName: 'Tony', },
    //                 { isOpen: false, firstName: 'Tina', },
    //             ],
    //         }
    //     };
    //     const expected = {
    //         pagination: {
    //             currentPage: 2,
    //             rowSize: 5,
    //         },
    //         rows: [
    //             { isOpen: false, firstName: 'Paul', },
    //             { isOpen: true, firstName: 'Matt', },
    //             { isOpen: false, firstName: 'Michelle', },
    //             { isOpen: false, firstName: 'Walter', },
    //             { isOpen: true, firstName: 'Tony', },
    //             { isOpen: true, firstName: 'Tina', },
    //         ],
    //     };
    //
    //     expect(actions.expandRow(given)).toEqual(expected);
    // });
});
