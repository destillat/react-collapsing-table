import initialState from '../../store/initialState'

export const unorderedRows = [{ id: 2 }, { id: 3 }, { id: 1 }, { id: 6 }, { id: 3 }, { id: 5 }, ];
export const ascOrderedRows = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 3 }, { id: 5 }, { id: 6 }, ];
export const descOrderedRows = [{ id: 6 }, { id: 5 }, { id: 3 }, { id: 3 }, { id: 2 }, { id: 1 }, ];

export const unorderedRowIntialState = {
    ...initialState,
    table: {
        ...initialState.table,
        rows: {
            ...initialState.table.rows,
            intial: unorderedRows,
            filtered: unorderedRows,
        },
    }
};

export const unorderedRowNoneIntialState = {
    ...initialState,
    table: {
        ...initialState.table,
        rows: {
            ...initialState.table.rows,
            intial: unorderedRows,
            filtered: unorderedRows,
        },
        sort: {
            ...initialState.table.sort,
            direction: 'none',
            column: 'id',
        }
    }
};

export const unorderedRowAscIntialState = {
    ...initialState,
    table: {
        ...initialState.table,
        rows: {
            ...initialState.table.rows,
            intial: unorderedRows,
            filtered: unorderedRows,
        },
        sort: {
            ...initialState.table.sort,
            direction: 'ascending',
            column: 'id',
        }
    }
};

export const unorderedRowDescIntialState = {
    ...initialState,
    table: {
        ...initialState.table,
        rows: {
            ...initialState.table.rows,
            intial: unorderedRows,
            filtered: unorderedRows,
        },
        sort: {
            ...initialState.table.sort,
            direction: 'descending',
            column: 'id',
        }
    }
};

export const unorderedRowDescDifferentDirectionIntialState = {
    ...initialState,
    table: {
        ...initialState.table,
        rows: {
            ...initialState.table.rows,
            intial: unorderedRows,
            filtered: unorderedRows,
        },
        sort: {
            ...initialState.table.sort,
            direction: 'dMoney',
            column: 'id',
        }
    }
};

export const unorderedRowDescDifferentColumnAndDirectionIntialState = {
    ...initialState,
    table: {
        ...initialState.table,
        rows: {
            ...initialState.table.rows,
            intial: unorderedRows,
            filtered: unorderedRows,
        },
        sort: {
            ...initialState.table.sort,
            direction: 'dMoney',
            column: 'dMoney',
        }
    }
};

export const oneHiddenColumn = {
    ...initialState,
    table: {
        ...initialState.table,
        columns: {
            ...initialState.table.columns,
            visible: [
                { accessor: 'firstName', label: 'First Name', priorityLevel: 1, },
                { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, },
            ],
            hidden: [
                { accessor: 'email', label: 'Email', priorityLevel: 3, },
            ],
        }
    }
};

export const noHiddenColumns = {
    ...initialState,
    table: {
        ...initialState.table,
        columns: {
            ...initialState.table.columns,
            visible: [
                { accessor: 'firstName', label: 'First Name', priorityLevel: 1, },
                { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, },
                { accessor: 'email', label: 'Email', priorityLevel: 3, },
            ],
            hidden: [],
        }
    }
};

export const oneVisibleColumn = {
    ...initialState,
    table: {
        ...initialState.table,
        columns: {
            ...initialState.table.columns,
            visible: [
                { accessor: 'email', label: 'Email', priorityLevel: 3, },
            ],
            hidden: [
                { accessor: 'firstName', label: 'First Name', priorityLevel: 1, },
                { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, },
            ],
        }
    }
};

export const noVisibleColumns = {
    ...initialState,
    table: {
        ...initialState.table,
        columns: {
            ...initialState.table.columns,
            visible: [],
            hidden: [
                { accessor: 'firstName', label: 'First Name', priorityLevel: 1, },
                { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, },
                { accessor: 'email', label: 'Email', priorityLevel: 3, },
            ],
        }
    }
}

export const needToAddRows = {
    ...initialState,
    table: {
        ...initialState.table,
        columns: {
            ...initialState.table.columns,
            visible: [
                {
                    accessor: 'firstName',
                    label: 'First Name',
                    priorityLevel: 1,
                    minWidth: 100,
                },
            ],
            hidden: [
                {
                    accessor: 'lastName',
                    label: 'Last Name',
                    priorityLevel: 2,
                    minWidth: 100,
                },
                {
                    accessor: 'email',
                    label: 'Email',
                    priorityLevel: 3,
                    minWidth: 100,
                },
            ],
        }
    }
}
