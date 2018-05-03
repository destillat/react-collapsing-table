//React
import React from 'react';
import { ColumnPropType } from '../utils/propTypes';
//Components
import { sortDirection } from '../assets/icons/Icon';

const Column = ({ accessor, label, sortable, onClick, sort, icons }) => {
    const direction = sort.column === accessor ? sort.direction : 'none';
    const icon = sortable ? sortDirection({ direction, icons }) : "";
    const sortFunction = sortable ? () => onClick({ column: accessor }) : () => {};
    const cssClass = `column-${accessor} ${ sortable ? 'clickable' : '' }`;

    return (
            <th key={ accessor }
                onClick={ sortFunction }
                className={ cssClass }>{ label }{ icon }</th>
    );
};

Column.propTypes = ColumnPropType;

export default Column
