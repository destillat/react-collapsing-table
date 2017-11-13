//React
import React, { Component }  from 'react';
import { array, arrayOf, shape, string, number, func } from 'prop-types';
//Components
import Columns from './Columns';
import Rows from './Rows';
import { calculateRows, sortColumn } from '../actions/TableActions'

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
        columns: {
            initial: columns,
            visible: columns,
            hidden: columns,
        },
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
      console.log(this.state);
      const newState = sortColumn({ column, state: this.state })
      console.log(newState);
      this.setState({ ...newState });
    }

    render(){
      const { columns: { visible } } = this.state;
      const displayedRows = calculateRows(this.state)

      return (
          <div>
              <table className="react-collapsible">
                  <Columns columns={ visible } sortRows={ this.sortRows } />
                  <Rows rows={ displayedRows }
                        visibleColumns={ visible } />
              </table>
          </div>
      );
    }
};

Table.PropTypes = {
    table: shape({
        rows: shape({
            displayed: array.isRequierd,
        }),
        columns: shape({
            visible: arrayOf(shape({
                accessor: string.isRequired,
                label: string.isRequired,
            })),
            hidden: arrayOf(shape({
                accessor: string.isRequired,
                label: string.isRequired,
            })),
        }),
        pagination: shape({
            currentPage: number.isRequierd,
        }),
        globalSearchString: string.isRequierd,
    }),
    actions: shape({
        nextPage: func.isRequired,
        previousPage: func.isRequired,
        sortColumn: func.isRequired,
        searchRows: func.isRequired,
        clearSearch: func.isRequired,
        expandRow: func.isRequired,
        resizeTable: func.isRequired,
    })
};

export default Table
