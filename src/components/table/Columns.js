//React
import React from 'react';
import {} from 'prop-types';
//Components
import Column from './Column';

const Columns = ({ columns, onClick }) => {
    const tableColumns = columns.map(({ accessor, label }) => {
        return <Column key={ accessor } accessor={ accessor } label={ label } onClick={ onClick }/>;
    });
    return (
        <thead>
            <tr>
                { tableColumns }
            </tr>
        </thead>
    );
};

Columns.PropTypes = {};

export default Columns
