//React
import React from 'react';
import { string } from 'prop-types';
//Components
import { columnDirection } from '../../assets/icons/Icon';

const Column = ({ accessor, label, onClick, sort }) => {
    const direction = sort.column === accessor ? sort.direction : 'none';
    const icon = columnDirection({ direction });

    return (
            <th key={ accessor }
                onClick={ () => onClick({ column: accessor })}
                className={ `column-${accessor}` }>{ label }{ icon }</th>
    );
};

Column.PropTypes = {
    accessor: string.isRequired,
    label: string.isRequired,
};

export default Column
