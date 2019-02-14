import { sortDirection } from "../assets/icons/Icon";
import { stat } from "fs";

interface Pagination {
    currentPage: number;
    rowSize: number;
    totalPages: number;
    inputtedPage: number;
}

interface Row {
    isOpen: boolean
}

interface State {
    rows: Array<Row>,
    pagination: Pagination
    sort: {
        column: string;
        direction: string;
    }
    columns: [
        {
            accessor: string;
            sortable: boolean;
            sortType: string;
        }
    ],
    paginationEventListener: (props: { pagination: Pagination}) => void
}

//What rows should be displayed?
interface CalculateRowsProps {
    readonly state: State
}
export function calculateRows(props: CalculateRowsProps): Array<object> {
    const {
        state: {
            rows,
            pagination: { currentPage, rowSize }
        }
    } = props;

    //pagination
    if( rows.length > 0 ) {
        const startingPoint = ((currentPage - 1) * rowSize);
        const endingPoint = startingPoint + rowSize;
        return rows.slice(startingPoint, endingPoint);
    }

    return []
};

interface SortColumnProps {
    column: string,
    state: State
}
//Sorting Rows
export function sortColumn(props: SortColumnProps): object {
    const { column, state } = props

    const { 
        sortedColumn, 
        sortedDirection 
    } = changeSortFieldAndDirection({ newColumn: column, state });

    const updatedState = { 
        ...state, 
        sort: { 
            ...state.sort, 
            column: sortedColumn,
            direction: sortedDirection 
        } 
    };

    const { sortedRows } = changeRowOrder({ column: sortedColumn, state: updatedState });
    
    return { ...updatedState, rows: sortedRows };
};

interface ChangeSortFieldAndDirectionProps {
    newColumn: string, 
    state: State
}

interface ChangeSortFieldAndDirectionReturn {
    sortedColumn: string,
    sortedDirection: string
}

export function changeSortFieldAndDirection(props: ChangeSortFieldAndDirectionProps): ChangeSortFieldAndDirectionReturn {
    const { 
        newColumn, 
        state: { 
            sort: { column, direction }
        }
    } = props
    let newDirection;

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

interface ChangeRowOrderProps {
    column: string;
    state: State
}

export function changeRowOrder(props: ChangeRowOrderProps) {
    const { column, state } = props
    const { sort: { direction }, columns } = state;
    let rows = state.rows;

    const columnBeingSorted = columns.filter(c => c.accessor === column)[0];
    const type = (columnBeingSorted && columnBeingSorted.sortable !== false) ? columnBeingSorted.sortType : null;

    switch (direction) {
        case 'ascending':
            rows.sort(dynamicSort({ column, type }));
            break;
        case 'descending':
            rows.sort(dynamicSort({ column, type })).reverse();
            break;
        default:
            rows.sort(dynamicSort({ column, type }));
    }

    return { sortedRows: rows };
};

interface dynamicSortProps {
    column: string,
    type: string | null
}

export const dynamicSort = (props: dynamicSortProps) => {
    const { column, type } = props

    switch (type) {
        case 'date':
            return (a: Row, b: Row) => {
                const [aMonth, aDay, aYear] = a[column].split('/');
                const [bMonth, bDay, bYear] = b[column].split('/');
                const aDate = [aYear, aMonth, aDay].join('');
                const bDate = [bYear, bMonth, bDay].join('');
                return ((aDate < bDate) ? 1 : (aDate > bDate) ? -1 : 0)
            };
        default:
            return (a: object, b: object) => ((a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0);
    }
};

//Pagination
export const nextPage = (props: { state: State }): { state: State, currentPage: number } => {
    const { state } = props
    const { totalPages, currentPage } = state.pagination;
    const validatedCurrentPage = checkPageState({ newPage: currentPage + 1, totalPages, currentPage });

    return changePage({ state, currentPage: validatedCurrentPage })
};

export const previousPage = (props: { state: State }): { state: State, currentPage: number } => {
    const { state } = props
    const { totalPages, currentPage } = state.pagination;
    const validatedCurrentPage = checkPageState({ newPage: currentPage - 1, totalPages, currentPage });

    return changePage({ state, currentPage: validatedCurrentPage })
};

interface goToPageProps {
    shouldCall: boolean;
    state: State;
    newPage: string,
}

export const goToPage = (props: goToPageProps) => {
    return props.shouldCall ? setCurrentPage(props) : setInputtedPage(props);
};

export const setCurrentPage = (props: goToPageProps): State => {
    const { state, newPage, shouldCall } = props
    const { totalPages, currentPage } = state.pagination;
    const validatedCurrentPage = checkPageState({ newPage, totalPages, currentPage, shouldCall });

    return {
        ...state,
        pagination: {
            ...state.pagination,
            currentPage: validatedCurrentPage,
            inputtedPage: validatedCurrentPage
        }
    };
};

export const setInputtedPage = (props: goToPageProps): State => {
    const { state, newPage, shouldCall } = props
    const { totalPages, currentPage } = state.pagination;
    const validatedCurrentPage = checkPageState({ newPage, totalPages, currentPage, shouldCall });

    return { 
        ...state, 
        pagination: { 
            ...state.pagination, 
            inputtedPage: validatedCurrentPage 
        } 
    };
};

interface checkPageStateProps {
    newPage: number,
    currentPage: number,
    totalPages: number,
    shouldCall?: boolean
}

export const checkPageState = (props: checkPageStateProps): number => {
    const { newPage, currentPage, totalPages, shouldCall } = props
    const isBelowZero = newPage < 0;
    const isZero = newPage === "0";
    const isAboveTotalPages = newPage > totalPages;
    const isNotANumber = isNaN(newPage);
    const isEmpty = newPage.length === 0;

    if(isNotANumber) {
        return currentPage;
    } else if( isZero && shouldCall) {
        return currentPage;
    } else if(isBelowZero) {
        return 1;
    } else if(isAboveTotalPages) {
        return totalPages;
    } else if(isEmpty && shouldCall){
        return currentPage;
    } else {
        return newPage;
    }
};

interface changePageProps {
    state: State,
    currentPage: number
}
export const changePage = (props: changePageProps) => {
    const { state, currentPage } = props
    const pagination = { ...state.pagination, currentPage, inputtedPage: currentPage } ;
    if(state.paginationEventListener) state.paginationEventListener({ pagination });
    return { ...state, pagination }
};

interface expandRowProps {
    rowIndex: number,
    state: State
}
//Hide or Show Rows
export const expandRow = (props: expandRowProps) => {
    const { rowIndex, state } = props
    const actualIndex = rowIndex + ((state.pagination.currentPage - 1) * state.pagination.rowSize);
    const newRows = state.rows.map((row, index) => {
        return (index === actualIndex) ? { ...row, isOpen: !row.isOpen } : row
    });
    return { ...state, rows: newRows };
};
