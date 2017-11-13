export const calculateRows = (state) => {
    const {
      rows: { filtered },
      pagination: { currentPage, rowSize }
    } = state;
    let selectedRows = []

    //pagination
    if( filtered.length > 0 ) {
        const startingPoint = ((currentPage - 1) * rowSize);
        const endingPoint = startingPoint + rowSize;
        selectedRows = filtered.slice(startingPoint, endingPoint);
    }

    return selectedRows
};
