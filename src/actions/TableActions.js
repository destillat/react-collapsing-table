//What rows should be displayed?
export const calculateRows = ({ state }) => {
    const {
        rows,
        pagination: { currentPage, rowSize }
    } = state;
    let selectedRows = [];
    //pagination
    if( rows.length > 0 ) {
        const startingPoint = ((currentPage - 1) * rowSize);
        const endingPoint = startingPoint + rowSize;
        selectedRows = rows.slice(startingPoint, endingPoint);
    }

    return selectedRows
};

//Sorting Rows
export const sortColumn = ({ column, state }) => {
    const { sortedColumn, sortedDirection } = changeSortFieldAndDirection({ newColumn: column, state });
    state = { ...state, sort: { ...state.sort, column: sortedColumn, direction: sortedDirection } };
    const { sortedRows } = changeRowOrder({ column: sortedColumn, state });
    return { ...state, rows: sortedRows };
};

export const changeSortFieldAndDirection = ({ newColumn, state }) => {
    let newDirection;
    const { sort: { column, direction, defaultSortColumn } } = state;

    if(column === newColumn) {
        switch (direction) {
            case 'none':
                newDirection = 'ascending';
                break;
            case 'ascending':
                newDirection = 'descending';
                break;
            case 'descending':
                newDirection = 'ascending';
                newColumn = defaultSortColumn;
                break;
            default:
                newDirection = 'none';
                break;
        }
    } else {
        newDirection = 'ascending';
    }

    return { sortedColumn: newColumn, sortedDirection: newDirection };
};

export const changeRowOrder = ({ column, state }) => {
    // TODO: search columns for priority level 1 as deafult search field
    const { sort: { direction, defaultSortColumn } } = state;
    let rows = state.rows;

    switch (direction) {
        case 'ascending':
            rows.sort(dynamicSort({ column }));
            break;
        case 'descending':
            rows.sort(dynamicSort({ column })).reverse();
            break;
        case 'none':
            // TODO: added in priority level to figure out the default search field
            // newRows = allRows.sort(dynamicSort({ column: 'firstName'}));
            rows.sort(dynamicSort({ column: defaultSortColumn }));
            break;
        default:
            rows.sort(dynamicSort({ column }));
    }

    return { sortedRows: rows };
};

export const dynamicSort = ({ column }) => {
    return (a, b) => ((a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0);
};

//Pagination
export const nextPage = ({ state }) => {
    return { ...state, pagination: { ...state.pagination, currentPage: state.pagination.currentPage + 1 } }
};

export const previousPage = ({ state }) => {
    return { ...state, pagination: { ...state.pagination, currentPage: state.pagination.currentPage - 1 } }
};

//Hide or Show Rows
export const expandRow = ({ rowIndex, state }) => {
    const actualIndex = rowIndex + ((state.pagination.currentPage - 1) * state.pagination.rowSize);
    const newRows = state.rows.map((row, index) => {
        return (index === actualIndex) ? { ...row, isOpen: !row.isOpen } : row
    });
    return { ...state, rows: newRows };
};
