//React
import React from 'react';
import { ColumnsPropType } from '../utils/propTypes';
//Components
import Column from './Column';

const Columns = ({ columns, sortRows, sort }) => {
    const tableColumns = columns.map(({ accessor, label }) => {
        return <Column key={ accessor }
                       accessor={ accessor }
                       label={ label }
                       sort={ sort }
                       onClick={ sortRows } />;
    });
    return (
        <thead>
            <tr>
                { tableColumns }
            </tr>
        </thead>
    );
};

Columns.propTypes = ColumnsPropType;

export default Columns
