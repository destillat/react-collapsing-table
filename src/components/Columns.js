//React
import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
//Components
import Column from './Column';

const Columns = ({ columns, }) => {
    const tableColumns = columns.map(({ accessor, label }) => {
        return <Column key={ accessor }
                       accessor={ accessor }
                       label={ label } />;
    });
    return (
        <thead>
            <tr>
                { tableColumns }
            </tr>
        </thead>
    );
};

Columns.PropTypes = {
    columns: arrayOf(shape({
        accessor: string.isRequired,
        label: string.isRequired,
    })),
    onClick: func,
};

export default Columns
