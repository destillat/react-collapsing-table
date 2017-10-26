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

    render() {
        const { table } = this.props;
        const actions = {
            nextPage: this.nextPage,
            previousPage: this.previousPage,
            sortColumn: this.sortColumn,
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
