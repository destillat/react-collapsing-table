//React
import React from 'react';
import { object, string } from 'prop-types';
//Components
import { getIcon } from '../../assets/icons/Icon'

const Cell = ({row, accessor}) => {
    return <td className={ accessor }>getIcon({ id: `row-${index}`}){ row[accessor] }</td>;
};

Cell.PropTypes = {
    row: object.isRequired,
    accessor: string.isRequired,
};

export default Cell
