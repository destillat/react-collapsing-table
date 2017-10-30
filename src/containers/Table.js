//React
import React, {Component} from 'react';
//Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TableActions from '../actions/TableActions';
//Components
import TableComponent from '../components/table/Table';

export class Table extends Component {
    componentWillMount(){
        this.props.actions.fetchData();
    }

    nextPage = () => {
        this.props.actions.nextPage();
    };

    previousPage = () => {
        this.props.actions.previousPage();
    };

    sortColumn = ({ column }) => {
        this.props.actions.sortColumn({ column });
    };

    searchRows = (event) => {
        const { value } = event.target;
        this.props.actions.searchRows({ searchString: value });
    };

    clearSearch = () => {
        this.props.actions.clearSearch();
    };

    expandRow = ({ rowIndex }) => {
        this.props.actions.expandRow({ rowIndex })
    };

    render() {
        const { table } = this.props;
        const actions = {
            nextPage: this.nextPage,
            previousPage: this.previousPage,
            sortColumn: this.sortColumn,
            searchRows: this.searchRows,
            clearSearch: this.clearSearch,
            expandRow: this.expandRow,
        };

        return (
            <TableComponent table={ table }
                            actions={ actions } />
        );
    }
}

function mapStateToProps(state) {
    return {
        table: state.table,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TableActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
