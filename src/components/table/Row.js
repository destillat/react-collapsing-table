//React
import React from 'react';
import {} from 'prop-types';
//Components
import Cell from './Cell';

const Row = ({row, columns}) => {
    const cells = columns.map(({ accessor }) => {
        return <Cell key={ accessor } row={ row } accessor={ accessor } />
    });
    return (
        <tr>
            { cells }
        </tr>
    );
};

Row.PropTypes = {};

export default Row
