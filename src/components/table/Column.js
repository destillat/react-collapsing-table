//React
import React from 'react';
import {} from 'prop-types';
//Components

const Column = ({ accessor, label }) => {

    return (
        <tr>
            <th key={ accessor } className={ `column-${accessor}` }>{ label }</th>;
        </tr>
    );
};

Column.PropTypes = {};

export default Column