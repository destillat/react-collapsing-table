//React
import React, {Component} from 'react';
//Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TableActions from '../actions/TableActions';
//Components
import TableComponent from '../components/table/Table';

class Table extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { data } = this.props;

        return (
            <TableComponent data={ data }/>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.table.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TableActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)