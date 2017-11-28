//React
import React from 'react';
import { CellPropType } from '../utils/propTypes';
//Components
import { expandIcon } from '../assets/icons/Icon';

const Cell = ({ row, accessor, cellIndex, rowIndex, expandRow, hiddenColumnsLength }) => {
    const icon = expandIcon({ cellIndex, rowIndex, row, hiddenColumnsLength, expandRow });

    return <td className={ accessor }>{ icon }<span dangerouslySetInnerHTML={{ __html: row[accessor] }} /></td>;
};

Cell.propTypes = CellPropType;

export default Cell
