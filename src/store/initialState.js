export default {
    table: {
        allRows: [],
        displayedRows: [],
        columns: [
            { accessor: 'firstName', label: 'First Name' },
            { accessor: 'lastName', label: 'Last Name' },
            { accessor: 'email', label: 'Email' },
            { accessor: 'address', label: 'Address' },
            { accessor: 'city', label: 'City' },
            { accessor: 'state', label: 'State' },
            { accessor: 'country', label: 'Country' },
            { accessor: 'zipCode', label: 'Zip Code' },
            { accessor: 'bio', label: 'Bio' },
        ],
        rowSize: 5,
        currentPageNumber: 1,
        rowSizeOptions: [15, 30, 60],
    }
}
