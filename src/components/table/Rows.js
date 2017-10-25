//React
import React from 'react';
import {} from 'prop-types';
//Components
import Row from './Row';

const Rows = ({rows, columns,}) => {
    const rows = rows.map((row, index) => {
        return <Row key={ index } row={ row } columns={ columns }/>
    });

    return (
        <tbody>
            { rows }
        </tbody>
    );
};

Rows.PropTypes = {};

export default Rows