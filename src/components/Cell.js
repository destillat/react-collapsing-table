//React
import React from 'react';
import { object, string } from 'prop-types';
//Components
import { expandIcon } from '../assets/icons/Icon';

const Cell = ({ row, accessor, cellIndex, rowIndex, expandRow, hiddenColumnsLength }) => {
    const icon = expandIcon({ cellIndex, rowIndex, row, hiddenColumnsLength, expandRow });

    return <td className={ accessor }>{ icon }<span dangerouslySetInnerHTML={{ __html: row[accessor] }} /></td>;
};

Cell.PropTypes = {
    row: object.isRequired,
    accessor: string.isRequired,
};

export default Cell
