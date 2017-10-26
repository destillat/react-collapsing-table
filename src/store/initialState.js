export default {
    table: {
        allRows: [],
        displayedRows: [],
        columns: [
            { accessor: 'firstName', label: 'First Name', priorityLevel: 1, },
            { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, },
            { accessor: 'email', label: 'Email', priorityLevel: 3, },
            { accessor: 'address', label: 'Address', priorityLevel: 4, },
            { accessor: 'city', label: 'City', priorityLevel: 5, },
            { accessor: 'state', label: 'State', priorityLevel: 6, },
            { accessor: 'country', label: 'Country', priorityLevel: 7, },
            { accessor: 'zipCode', label: 'Zip Code', priorityLevel: 8, },
            { accessor: 'bio', label: 'Bio' },
        ],
        rowSize: 5,
        currentPageNumber: 1,
        rowSizeOptions: [15, 30, 60],
        sort: {
            direction: 'none',
            column: '',
        }
    }
}
