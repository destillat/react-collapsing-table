//React
import React, {Component} from 'react';
//Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TableActions from '../actions/TableActions';
//Components
import TableComponent from '../components/table/Table';

export class Table extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
        this.props.actions.fetchData();
    }

    render() {
        const { table } = this.props;

        return (
            <TableComponent data={ table.data }
                            columns={ table.columns } />
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
