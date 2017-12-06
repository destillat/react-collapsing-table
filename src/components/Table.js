//React
import React, { Component }  from 'react';
import { TablePropType } from '../utils/propTypes';
//Components
import Search from './Search';
import Columns from './Columns';
import Rows from './Rows';
import Pagination from './Pagination';
import { calculateRows, sortColumn, nextPage, previousPage, expandRow } from '../actions/TableActions'
import { resizeTable } from '../actions/ResizeTableActions'
import { searchRows, clearSearch } from '../actions/SearchActions';
import throttle from 'lodash.throttle';

export class Table extends Component {
    constructor(props) {
        super(props);
        const {
            columns,
            rows = [],
            rowSize = 10,
            currentPage = 1,
            column = props.columns.reduce((prev, curr) => {
                return prev.priorityLevel < curr.priorityLevel ? prev : curr;
            }).accessor,
            direction = 'ascending',
            callbacks = {},
            showSearch = false,
            showPagination = false,
        } = props;

        this.state = {
            columns: columns.map(column => { return { ...column, isVisible: true } }),
            rows,
            searchString: '',
            pagination: {
                rowSize,
                currentPage,
            },
            sort: {
                column,
                direction,
            },
            callbacks,
            showSearch,
            showPagination,
        };

        this.resizeTable = this.resizeTable.bind(this);
        this.sortRows = this.sortRows.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.expandRow = this.expandRow.bind(this);
        this.searchRows = this.searchRows.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    componentWillMount(){
        window.addEventListener('resize', throttle(this.resizeTable, 150));
    }

    componentDidMount(){
        this.resizeTable();
    }

    componentWillReceiveProps({ rows }){
        this.setState({ ...this.state, rows, })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeTable);
    }

    resizeTable() {
        this.setState(resizeTable({ width: window.innerWidth, state: this.state }))
    };

    sortRows({ column }) {
        this.setState(sortColumn({ column, state: this.state }));
    }

    nextPage() {
        this.setState(nextPage({ state: this.state }));
    };

    previousPage() {
        this.setState(previousPage({ state: this.state }));
    };

    expandRow({ rowIndex }) {
        this.setState(expandRow({ rowIndex, state: this.state }));
    }

    searchRows({ target: { value }}) {
        this.setState(searchRows({ searchString: value, state: this.state, initialRows: this.props.rows }));
    }

    clearSearch() {
        this.setState(clearSearch({ state: this.state, initialRows: this.props.rows }));
    }

    render(){
        const { columns, pagination: { currentPage, rowSize }, rows, callbacks, showSearch, showPagination } = this.state;
        const displayedRows = calculateRows({ state: this.state });
        const visibleColumns = Object.assign([], columns.filter(column => column.isVisible));
        const hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));

        const PaginationComponent = showPagination && <Pagination currentPage={ currentPage }
                                        totalRows={ rows.length }
                                        rowSize={ rowSize }
                                        nextPage={ this.nextPage }
                                        previousPage={ this.previousPage } />;
        const SearchComponent = showSearch && <Search searchString={ this.state.searchString }
                                                      searchRows={ this.searchRows }
                                                      clearSearch={ this.clearSearch } />;

        return (
            <div>
                { SearchComponent }
                <table className="react-collapsible">
                    <Columns columns={ visibleColumns }
                             sortRows={ this.sortRows }
                             sort={ this.state.sort } />
                    <Rows rows={ displayedRows }
                          visibleColumns={ visibleColumns }
                          hiddenColumns={ hiddenColumns }
                          expandRow={ this.expandRow }
                          callbacks={ callbacks } />
                </table>
                { PaginationComponent }
            </div>
        );
    }
}

Table.propTypes = TablePropType;

export default Table
