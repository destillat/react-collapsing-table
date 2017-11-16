import * as actions from '../../actions/TableActions';

describe('Table Actions', () => {
  //CALCULATE ROWS
  it('should return no rows when none are present', () => {
      const given = {
        state: {
          rows: [],
          pagination: {
            currentPage: 1,
            rowSize: 5,
          }
        }
      };
      const expected = [];

      expect(actions.calculateRows(given)).toEqual(expected);
  });

  it('should return the first 5 rows', () => {
      const given = {
        state: {
          rows: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ],
          pagination: {
            currentPage: 1,
            rowSize: 5,
          }
        }
      };
      const expected = [1, 2, 3, 4, 5];

      expect(actions.calculateRows(given)).toEqual(expected);
  });

  it('should return the second 5 rows', () => {
      const given = {
        state: {
          rows: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ],
          pagination: {
            currentPage: 2,
            rowSize: 5,
          }
        }
      };
      const expected = [6, 7, 8, 9, 10];

      expect(actions.calculateRows(given)).toEqual(expected);
  });

  it('should return the last 4 rows', () => {
      const given = {
        state: {
          rows: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ],
          pagination: {
            currentPage: 3,
            rowSize: 5,
          }
        }
      };
      const expected = [11, 12, 13, 14];

      expect(actions.calculateRows(given)).toEqual(expected);
  });
  //SORT COLUMN
  it('should return ascending if the new column matches the old column and there was no previous sort direction', () => {
      const given = {
        column: 'firstName',
        state: {
          sort: {
            direction: 'none',
            column: 'firstName',
            defaultSortColumn: 'email',
          },
          rows: [
            { firstName: 'Paul', email: 'p@gmail.com' },
            { firstName: 'Adam', email: 'd@gmail.com' },
            { firstName: 'Matt', email: 'm@gmail.com' },
            { firstName: 'Matt', email: 'a@gmail.com' },
          ],
        }
      };
      const expected = {
        sort: {
          direction: 'ascending',
          column: 'firstName',
          defaultSortColumn: 'email',
        },
        rows: [
          { firstName: 'Adam', email: 'd@gmail.com' },
          { firstName: 'Matt', email: 'm@gmail.com' },
          { firstName: 'Matt', email: 'a@gmail.com' },
          { firstName: 'Paul', email: 'p@gmail.com' },
        ],
      };

      expect(actions.sortColumn(given)).toEqual(expected);
  });
  //CHANGE SORT FIELD AND DIRECTION
  it('should return ascending if the new column matches the old column and there was no previous sort direction', () => {
      const given = {
        newColumn: 'firstName',
        state: {
          sort: {
            direction: 'none',
            column: 'firstName',
          }
        }
      };
      const expected = {
        sortedColumn: 'firstName',
        sortedDirection: 'ascending'
      };

      expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
  });

  it('should return descending if the new column matches the old column and there was the previous sort direction was ascending', () => {
      const given = {
        newColumn: 'firstName',
        state: {
          sort: {
            direction: 'ascending',
            column: 'firstName',
          }
        }
      };
      const expected = {
        sortedColumn: 'firstName',
        sortedDirection: 'descending'
      };

      expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
  });

  it('should return none if the new column matches the old column and there was the previous sort direction was descending', () => {
      const given = {
        newColumn: 'firstName',
        state: {
          sort: {
            direction: 'descending',
            column: 'firstName',
          }
        }
      };
      const expected = {
        sortedColumn: 'firstName',
        sortedDirection: 'none'
      };

      expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
  });

  it('should return none if the new column matches the old column and there was the previous sort direction was not defined', () => {
      const given = {
        newColumn: 'firstName',
        state: {
          sort: {
            direction: 'EyeOfTheTiger',
            column: 'firstName',
          }
        }
      };
      const expected = {
        sortedColumn: 'firstName',
        sortedDirection: 'none'
      };

      expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
  });

  it('should return ascending if the new column does not match the old column', () => {
      const given = {
        newColumn: 'firstName',
        state: {
          sort: {
            direction: 'ascending',
            column: 'email',
          }
        }
      };
      const expected = {
        sortedColumn: 'firstName',
        sortedDirection: 'ascending'
      };

      expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
  });
  //CHANGE ROW ORDER
  it('should return the rows listed in ascending order based on the column clicked', () => {
      const given = {
        column: 'firstName',
        state: {
          rows: [
            { firstName: 'Paul', email: 'p@gmail.com' },
            { firstName: 'Adam', email: 'd@gmail.com' },
            { firstName: 'Matt', email: 'm@gmail.com' },
            { firstName: 'Matt', email: 'a@gmail.com' },
          ],
          sort: {
            direction: 'ascending',
            defaultSortColumn: 'email',
          }
        }
      };
      const expected = {
        sortedRows: [
          { firstName: 'Adam', email: 'd@gmail.com' },
          { firstName: 'Matt', email: 'm@gmail.com' },
          { firstName: 'Matt', email: 'a@gmail.com' },
          { firstName: 'Paul', email: 'p@gmail.com' },
        ]
      };

      expect(actions.changeRowOrder(given)).toEqual(expected);
  });

  it('should return the rows listed in descending order based on the column clicked', () => {
      const given = {
        column: 'firstName',
        state: {
          rows: [
            { firstName: 'Paul', email: 'p@gmail.com' },
            { firstName: 'Adam', email: 'd@gmail.com' },
            { firstName: 'Matt', email: 'm@gmail.com' },
            { firstName: 'Matt', email: 'a@gmail.com' },
          ],
          sort: {
            direction: 'descending',
            defaultSortColumn: 'email',
          }
        }
      };
      const expected = {
        sortedRows: [
          { firstName: 'Paul', email: 'p@gmail.com' },
          { firstName: 'Matt', email: 'a@gmail.com' },
          { firstName: 'Matt', email: 'm@gmail.com' },
          { firstName: 'Adam', email: 'd@gmail.com' },
        ]
      };

      expect(actions.changeRowOrder(given)).toEqual(expected);
  });

  it('should return the rows listed in ascending order based on the default column', () => {
      const given = {
        column: 'firstName',
        state: {
          rows: [
            { firstName: 'Paul', email: 'p@gmail.com' },
            { firstName: 'Adam', email: 'd@gmail.com' },
            { firstName: 'Matt', email: 'm@gmail.com' },
            { firstName: 'Matt', email: 'a@gmail.com' },
          ],
          sort: {
            direction: 'none',
            defaultSortColumn: 'email',
          }
        }
      };
      const expected = {
        sortedRows: [
          { firstName: 'Matt', email: 'a@gmail.com' },
          { firstName: 'Adam', email: 'd@gmail.com' },
          { firstName: 'Matt', email: 'm@gmail.com' },
          { firstName: 'Paul', email: 'p@gmail.com' },
        ]
      };

      expect(actions.changeRowOrder(given)).toEqual(expected);
  });

  it('should return the rows listed in ascending order based on the column clicked if direction is not one of the described states', () => {
      const given = {
        column: 'firstName',
        state: {
          rows: [
            { firstName: 'Paul', email: 'p@gmail.com' },
            { firstName: 'Adam', email: 'd@gmail.com' },
            { firstName: 'Matt', email: 'm@gmail.com' },
            { firstName: 'Matt', email: 'a@gmail.com' },
          ],
          sort: {
            direction: 'IAmALittleTeaPot',
            defaultSortColumn: 'email',
          }
        }
      };
      const expected = {
        sortedRows: [
          { firstName: 'Adam', email: 'd@gmail.com' },
          { firstName: 'Matt', email: 'm@gmail.com' },
          { firstName: 'Matt', email: 'a@gmail.com' },
          { firstName: 'Paul', email: 'p@gmail.com' },
        ]
      };

      expect(actions.changeRowOrder(given)).toEqual(expected);
  });

  it('should return the rows listed in the same order if it is not sure of how to sort the columns', () => {
      const given = {
        column: 'IAmALittleTeaPot',
        state: {
          rows: [
            { firstName: 'Paul', email: 'p@gmail.com' },
            { firstName: 'Adam', email: 'd@gmail.com' },
            { firstName: 'Matt', email: 'm@gmail.com' },
            { firstName: 'Matt', email: 'a@gmail.com' },
          ],
          sort: {
            direction: 'asecending',
            defaultSortColumn: 'email',
          }
        }
      };
      const expected = {
        sortedRows: [
          { firstName: 'Paul', email: 'p@gmail.com' },
          { firstName: 'Adam', email: 'd@gmail.com' },
          { firstName: 'Matt', email: 'm@gmail.com' },
          { firstName: 'Matt', email: 'a@gmail.com' },
        ]
      };

      expect(actions.changeRowOrder(given)).toEqual(expected);
  });
  //Pagination
  it('should update the currentPage to the next page', () => {
      const given = {
        state: {
          pagination: {
            currentPage: 2,
            rowSize: 15,
          }
        }
      };
      const expected = {
        pagination: {
          currentPage: 3,
          rowSize: 15,
        }
      };

      expect(actions.nextPage(given)).toEqual(expected);
  });

  it('should update the currentPage to the previous page', () => {
      const given = {
        state: {
          pagination: {
            currentPage: 2,
            rowSize: 15,
          }
        }
      };
      const expected = {
        pagination: {
          currentPage: 1,
          rowSize: 15,
        }
      };

      expect(actions.previousPage(given)).toEqual(expected);
  });

  //EXPAND OR HIDE ROW
  it('should hide a shown row', () => {
      const given = {
        rowIndex: 1,
        state: {
          pagination: {
            currentPage: 1,
            rowSize: 15,
          },
          rows: [
            { isOpen: false, firstName: 'Paul', },
            { isOpen: true, firstName: 'Matt', },
            { isOpen: false, firstName: 'Michelle', },
          ],
        }
      };
      const expected = {
        pagination: {
          currentPage: 1,
          rowSize: 15,
        },
        rows: [
          { isOpen: false, firstName: 'Paul', },
          { isOpen: false, firstName: 'Matt', },
          { isOpen: false, firstName: 'Michelle', },
        ],
      };

      expect(actions.expandRow(given)).toEqual(expected);
  });

  it('should show a hidden row', () => {
      const given = {
        rowIndex: 2,
        state: {
          pagination: {
            currentPage: 1,
            rowSize: 15,
          },
          rows: [
            { isOpen: false, firstName: 'Paul', },
            { isOpen: true, firstName: 'Matt', },
            { isOpen: false, firstName: 'Michelle', },
          ],
        }
      };
      const expected = {
        pagination: {
          currentPage: 1,
          rowSize: 15,
        },
        rows: [
          { isOpen: false, firstName: 'Paul', },
          { isOpen: true, firstName: 'Matt', },
          { isOpen: true, firstName: 'Michelle', },
        ],
      };

      expect(actions.expandRow(given)).toEqual(expected);
  });

  it('should show a hidden row on a different page', () => {
      const given = {
        rowIndex: 0,
        state: {
          pagination: {
            currentPage: 2,
            rowSize: 5,
          },
          rows: [
            { isOpen: false, firstName: 'Paul', },
            { isOpen: true, firstName: 'Matt', },
            { isOpen: false, firstName: 'Michelle', },
            { isOpen: false, firstName: 'Walter', },
            { isOpen: true, firstName: 'Tony', },
            { isOpen: false, firstName: 'Tina', },
          ],
        }
      };
      const expected = {
        pagination: {
          currentPage: 2,
          rowSize: 5,
        },
        rows: [
          { isOpen: false, firstName: 'Paul', },
          { isOpen: true, firstName: 'Matt', },
          { isOpen: false, firstName: 'Michelle', },
          { isOpen: false, firstName: 'Walter', },
          { isOpen: true, firstName: 'Tony', },
          { isOpen: true, firstName: 'Tina', },
        ],
      };

      expect(actions.expandRow(given)).toEqual(expected);
  });
});
