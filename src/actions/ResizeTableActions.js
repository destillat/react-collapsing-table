import { dynamicSort } from './TableActions'
// export const resizeTable = ({ width }) => {
//     const state = getState();
//     const { table: { columns: { visible } } } = state;
//     let visibleColumns = Object.assign([], visible);
//
//     let visibleColumnsWidth = 0;
//     visibleColumns.map(column => visibleColumnsWidth += column.minWidth);
//
//     visibleColumnsWidth > width ?
//         dispatch(tryToRemoveColumns({ visibleColumnsWidth, width })) :
//          dispatch(tryToAddColumns({ visibleColumnsWidth, width }))
// };
//
// export const tryToRemoveColumns = ({ visibleColumnsWidth, width }) => (dispatch, getState) => {
//     const state = getState();
//     const { table: { columns: { visible } } } = state;
//     let visibleColumns = Object.assign([], visible);
//     visibleColumns.sort(dynamicSort({column: 'priorityLevel'}));
//
//     while(visibleColumnsWidth > width && visibleColumns.length !== 0){
//         visibleColumnsWidth -= visibleColumns.pop().minWidth;
//         dispatch(removeColumn())
//     }
// };
// export const tryToAddColumns = ({ visibleColumnsWidth, width }) => (dispatch, getState) => {
//     const state = getState();
//     const { table: { columns: { hidden } } } = state;
//     let hiddenColumns = Object.assign([], hidden);
//     hiddenColumns.sort(dynamicSort({column: 'priorityLevel'}));
//
//     while(visibleColumnsWidth < width && hiddenColumns.length !== 0){
//         visibleColumnsWidth += hiddenColumns.shift().minWidth;
//         if(visibleColumnsWidth < width && hiddenColumns.length === 0) {
//           dispatch(addColumn());
//           dispatch(closeAllRows());
//         } else if (visibleColumnsWidth < width){
//             dispatch(addColumn())
//         }
//     }
// };
//
// export const closeAllRows = () => (dispatch, getState) => {
//   const state = getState();
//   const { table: { rows: { displayed } } } = state;
//   const rowsDisplayed = displayed.map(row => { return { ...row, isOpen: false } })
//   dispatch(closeAllRowsSuccess({ rowsDisplayed }));
// };
//
// export const closeAllRowsSuccess = ({ rowsDisplayed }) => {
//   return { type: types.CLOSED_ALL_ROWS, rowsDisplayed }
// };

export const removeColumn = ({ state }) => {
    const { columns } = state;
    let combinedColumns = Object.assign([], columns);
    let visibleColumns = Object.assign([], columns.filter(column => column.isVisible));
    let hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));

    if(visibleColumns.length !== 0) {
        visibleColumns.sort(dynamicSort({column: 'priorityLevel'}));
        const removedColumn = visibleColumns.pop()
        hiddenColumns.push({ ...removedColumn, isVisible: false });
        combinedColumns = [ ...visibleColumns, ...hiddenColumns ];
        combinedColumns.sort(dynamicSort({column: 'position'}));
    }
    return { ...state, columns: combinedColumns };
};
//
export const addColumn = ({ state }) => {
    const { columns } = state;
    let combinedColumns = Object.assign([], columns);
    let visibleColumns = Object.assign([], columns.filter(column => column.isVisible));
    let hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));

    if(hiddenColumns.length !== 0) {
        hiddenColumns.sort(dynamicSort({column: 'priorityLevel'}));
        const addedColumn = hiddenColumns.shift()
        visibleColumns.push({ ...addedColumn, isVisible: true });
        combinedColumns = [ ...visibleColumns, ...hiddenColumns ];
        combinedColumns.sort(dynamicSort({column: 'position'}));
    }
    return { ...state, columns: combinedColumns };
};
//
// export const resizeTableSuccess = ({ visible, hidden }) => {
//     return { type: types.RESIZED_TABLE, visible, hidden };
// };
