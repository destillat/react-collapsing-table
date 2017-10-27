//React
import React from 'react';
import { object, string } from 'prop-types';
//Components
import { expandIcon } from '../../assets/icons/Icon';

const Cell = ({row, accessor, cellIndex, rowIndex, actions, }) => {
    const icon = expandIcon({ cellIndex, rowIndex, row, actions});

    return <td className={ accessor }>{ icon }{ row[accessor] }</td>;
};

Cell.PropTypes = {
    row: object.isRequired,
    accessor: string.isRequired,
};

export default Cell
