//React
import React, { Component }  from 'react';
import { array, arrayOf, shape, string, number, func } from 'prop-types';
//Components
import Columns from './Columns';
import Rows from './Rows';
import Pagination from './Pagination';
import { calculateRows, sortColumn, nextPage, previousPage, } from '../actions/TableActions'
import { addColumn, removeColumn } from '../actions/ResizeTableActions'

export class Table extends Component {
    constructor(props) {
      super()
      const {
        columns = [],
        rows = [],
        rowSize = 10,
        currentPage = 1,
        defaultSortColumn = '',
        column = '',
        direction = 'none'
      } = props;

      this.state = {
        columns: columns.map(column => { return { ...column, isVisible: true } }),
        rows,
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
    }

    sortRows = ({ column }) => {
      this.setState(sortColumn({ column, state: this.state }));
    }

    nextPage = () => {
      this.setState(nextPage({ state: this.state }));
    };
    previousPage = () => {
      this.setState(previousPage({ state: this.state }));
    };
    addColumn = () => {
      console.log(this.state);
      this.setState(addColumn({ state: this.state }));
    };
    removeColumn = () => {
      console.log(this.state);
      this.setState(removeColumn({ state: this.state }));
    };

    render(){
      const { columns, pagination: { currentPage, rowSize }, rows } = this.state;
      const displayedRows = calculateRows(this.state)
      const visibleColumns = Object.assign([], columns.filter(column => column.isVisible));
      const hiddenColumns = Object.assign([], columns.filter(column => !column.isVisible));

      return (
          <div>
              <button onClick={ this.addColumn }>add column</button>
              <button onClick={ this.removeColumn }>remove column</button>
              <table className="react-collapsible">
                  <Columns columns={ visibleColumns } sortRows={ this.sortRows } />
                  <Rows rows={ displayedRows }
                        visibleColumns={ visibleColumns }
                        hiddenColumns={ hiddenColumns } />
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
