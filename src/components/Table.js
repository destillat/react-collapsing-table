//React
import React, { Component }  from 'react';
import { array, arrayOf, shape, string, number, func } from 'prop-types';
//Components
import Search from './Search';
import Columns from './Columns';
import Rows from './Rows';
import Pagination from './Pagination';
import { calculateRows, sortColumn, nextPage, previousPage, expandRow } from '../actions/TableActions'
import { resizeTable } from '../actions/ResizeTableActions'
import { searchRows, clearSearch } from '../actions/SearchActions';
const _ = require('lodash');

export class Table extends Component {
    constructor(props) {
      super()
      const {
        columns,
        rows = [],
        rowSize = 10,
        currentPage = 1,
        defaultSortColumn = props.columns.reduce((prev, curr) => {
            return prev.priorityLevel < curr.priorityLevel ? prev : curr;
        }).accessor,
        column = defaultSortColumn,
        direction = 'ascending'
      } = props;

      this.state = {
        columns: columns.map(column => { return { ...column, isVisible: true } }),
        initialRows: _.cloneDeep(rows),
        rows: _.cloneDeep(rows),
        searchString: '',
        pagination: {
          rowSize,
          currentPage,
        },
        sort: {
          defaultSortColumn,
          column,
          direction,
        }
      }

      this.resizeTable = this.resizeTable.bind(this);
      this.sortRows = this.sortRows.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.previousPage = this.previousPage.bind(this);
      this.expandRow = this.expandRow.bind(this);
      this.searchRows = this.searchRows.bind(this);
      this.clearSearch = this.clearSearch.bind(this);
    }

    componentWillMount(){
        window.addEventListener('resize', this.resizeTable);
    }

    componentDidMount(){
        this.resizeTable();
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

    searchRows(event) {
        const { value } = event.target;
        this.setState(searchRows({ searchString: value, state: this.state }));
    }

    clearSearch() {
      this.setState(clearSearch({ state: this.state }));
    }

    render(){
      const { columns, pagination: { currentPage, rowSize }, rows, } = this.state;
      const displayedRows = calculateRows({ state: this.state })
      const visibleColumns = Object.assign([], columns.filter(column => column.isVisible));
      const hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));

      return (
          <div>
              <Search searchString={ this.state.searchString }
                      searchRows={ this.searchRows }
                      clearSearch={ this.clearSearch } />
              <table className="react-collapsible">
                  <Columns columns={ visibleColumns }
                           sortRows={ this.sortRows }
                           sort={ this.state.sort } />
                  <Rows rows={ displayedRows }
                        visibleColumns={ visibleColumns }
                        hiddenColumns={ hiddenColumns }
                        expandRow={ this.expandRow } />
              </table>
              <Pagination currentPage={ currentPage }
                          totalRows={ rows.length }
                          rowSize={ rowSize }
                          nextPage={ this.nextPage }
                          previousPage={ this.previousPage } />
          </div>
      );
    }
};

Table.PropTypes = {};

export default Table
