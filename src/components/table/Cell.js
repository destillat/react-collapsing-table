//React
import React from 'react';
import { object, string } from 'prop-types';
//Components
import { expandIcon } from '../../assets/icons/Icon';
import '../../assets/styles/react-table.css';

const Cell = ({ row, accessor, cellIndex, rowIndex, actions, hiddenColumnsLength }) => {
    const icon = expandIcon({ cellIndex, rowIndex, row, hiddenColumnsLength, actions});

    return <td className={ accessor } dangerouslySetInnerHTML={{ __html: row[accessor] }} />;
};

Cell.PropTypes = {
    row: object.isRequired,
    accessor: string.isRequired,
};

export default Cell
