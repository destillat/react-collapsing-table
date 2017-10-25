//React
import React from 'react';
import {} from 'prop-types';
//Components

const Cell = ({row, accessor}) => {
    return <td className={ accessor }>{ row[accessor] }</td>;
};

Cell.PropTypes = {};

export default Cell