import { shape, arrayOf, array, bool, object, number, string, func } from 'prop-types';

//Building Blocks
export const Column = shape({
    accessor: string.isRequired,
    label: string.isRequired,
    isVisible: bool.isRequired,
})

export const Columns = arrayOf(Column)

export const Sort = shape({
    direction: string.isRequired,
    column: string.isRequired,
    defaultSortColumn: string.isRequired,
})

//Components
export const CellPropType = {
    row: object.isRequired,
    accessor: string.isRequired,
    cellIndex: number.isRequired,
    rowIndex: number.isRequired,
    expandRow: func.isRequired,
    hiddenColumnsLength: number.isRequired,
};

export const ColumnPropType = {
  accessor: string.isRequired,
  label: string.isRequired,
  onClick: func.isRequired,
  sort: Sort.isRequired,
};

export const ColumnsPropType = {
    columns: Columns.isRequired,
    sortRows: func.isRequired,
    sort: Sort.isRequired,
};

export const ExpandedRowPropType = {
    row: object.isRequired,
    columns: Columns.isRequired,
    colspan: number.isRequired,
};

export const PaginationPropType = {
    // currentPage: number.isRequierd,
    // totalRows: number.isRequierd,
    // rowSize: number.isRequierd,
    previousPage: func.isRequired,
    nextPage: func.isRequired,
};

export const RowPropType = {
    row: object.isRequired,
    visibleColumns: Columns.isRequired,
    hiddenColumns: Columns.isRequired,
    expandRow: func.isRequired,
    rowIndex: number.isRequired,
};

export const RowsPropType = {
    // rows: array.isRequierd,
    visibleColumns: Columns.isRequired,
    hiddenColumns: Columns.isRequired,
    expandRow: func.isRequired,
};

export const SearchPropType = {
    searchString: string.isRequired,
    searchRows: func.isRequired,
    clearSearch: func.isRequired,
};

export const TablePropType = {
    rows: array,
    // columns: Columns.isRequired,
    rowSize: number,
    currentPage: number,
    defaultSortColumn: string,
    column: string,
    direction: string,
};
