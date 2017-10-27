//React
import React from 'react';
import { object, string } from 'prop-types';
//Components

const Cell = ({row, accessor}) => {
    return <td className={ accessor }>{ row[accessor] }</td>;
};

Cell.PropTypes = {
    row: object.isRequired,
    accessor: string.isRequired,
};

export default Cell