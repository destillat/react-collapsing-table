//React
import React from 'react';
import { ColumnPropType } from '../utils/propTypes';
//Components
import { sortDirection } from '../assets/icons/Icon';

const Column = ({ accessor, label, onClick, sort }) => {
    const direction = sort.column === accessor ? sort.direction : 'none';
    const icon = sortDirection({ direction });

    return (
            <th key={ accessor }
                onClick={ () => onClick({ column: accessor })}
                className={ `column-${accessor}` }>{ label }{ icon }</th>
    );
};

Column.propTypes = ColumnPropType;

export default Column
