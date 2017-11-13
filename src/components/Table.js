//React
import React, { Component }  from 'react';
import { array, arrayOf, shape, string, number, func } from 'prop-types';
//Components
import Columns from './Columns';
import Rows from './Rows';
import { calculateRows } from '../actions/TableActions'

export class Table extends Component {
    constructor(props) {
      super()
      const {
        columns = [],
        rows = [],
        rowSize = 10,
        currentPage = 1,
      } = props;

      this.state = {
        columns: {
            initial: columns,
            visible: columns,
            hidden: columns,
        },
        rows: {
            initial: rows,
            filtered: rows,
            displayed: calculateRows({ rows: { filtered: rows, }, pagination: { rowSize, currentPage } }),
        },
        pagination: {
          rowSize,
          currentPage,
        }
      }
    }

    componentWillReceiveProps = (nextProps) => {
      console.log(nextProps);
      const { columns, rows, } = nextProps;

        this.setState({
          columns: {
            initial: columns,
          },
          rows: {
            initial: rows,
          }
        })
    };


    render(){
      const { rows: { displayed }, columns: { visible } } = this.state;

      return (
          <div>
              <table className="react-collapsible">
                  <Columns columns={ visible }/>
                  <Rows rows={ displayed }
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
