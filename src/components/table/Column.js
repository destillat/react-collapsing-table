//React
import React from 'react';
import {} from 'prop-types';
//Components

const Column = ({ accessor, label, onClick }) => {

    return (
            <th key={ accessor } onClick={ () => onClick({ column: accessor })} className={ `column-${accessor}` }>{ label }</th>
    );
};

Column.PropTypes = {};

export default Column
