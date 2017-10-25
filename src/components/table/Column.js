//React
import React from 'react';
import {} from 'prop-types';
//Components

const Column = ({ accessor, label }) => {

    return (
            <th key={ accessor } className={ `column-${accessor}` }>{ label }</th>
    );
};

Column.PropTypes = {};

export default Column
