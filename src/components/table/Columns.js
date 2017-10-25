//React
import React from 'react';
import {} from 'prop-types';
//Components
import Column from './Column';

const Columns = ({ columns }) => {
    const tableColumns = columns.map(({ accessor, label }) => {
        return <Column key={ accessor } accessor={ accessor } label={ label }/>;
    });
    return (
        <thead>
            { tableColumns }
        </thead>
    );
};

Columns.PropTypes = {};

export default Columns