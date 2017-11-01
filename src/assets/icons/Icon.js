//React
import React from 'react';
//Imported Icons
import OpenRow from 'react-icons/lib/md/keyboard-arrow-down';
import CloseRow from 'react-icons/lib/md/keyboard-arrow-up';
import CaretUp from 'react-icons/lib/fa/caret-up';
import CaretDown from 'react-icons/lib/fa/caret-down';

export const getIcon = ({ id, onClick, name, size=16 }) => {
    switch (name) {
        case 'OpenRow':
            return <span><OpenRow id={ id } onClick={ onClick } size={ size }/></span>;
        case 'CloseRow':
            return <span><CloseRow id={ id } onClick={ onClick } size={ size }/></span>;
        default:
            return <span />;
    }
};

export const expandIcon = ({ cellIndex, rowIndex, row, hiddenColumnsLength, actions }) => {
    let icon = null;
    const name = row.isOpen ? 'CloseRow' : 'OpenRow';
    const IS_FIRST_CELL = cellIndex === 0;
    const IS_HIDDEN_COULMNS = hiddenColumnsLength > 0;
    const IS_NOT_EMPTY_ROW = Object.keys(row).length > 1;

    if(IS_FIRST_CELL && IS_HIDDEN_COULMNS && IS_NOT_EMPTY_ROW){
        icon = getIcon({ name, onClick: () => actions.expandRow({ rowIndex }) });
    }

    return icon
};

export const columnDirection = ({ direction, size=20 }) => {
    switch (direction) {
        case 'ascending':
            return <span><CaretUp size={ size }/></span>;
        case 'descending':
            return <span><CaretDown size={ size }/></span>;
        default:
            return <span />;
    }
};