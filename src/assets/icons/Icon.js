//React
import React from 'react';
//Imported Icons
import OpenRow from 'react-icons/lib/md/keyboard-arrow-down';
import CloseRow from 'react-icons/lib/md/keyboard-arrow-up';

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

export const expandIcon = ({ cellIndex, rowIndex, row, actions }) => {
    let icon = null;
    const { isOpen } = row;
    const IS_FIRST_CELL = cellIndex === 0;

    if(IS_FIRST_CELL){
        const name = isOpen ? 'CloseRow' : 'OpenRow';
        icon = getIcon({ name, onClick: () => actions.expandRow({ rowIndex }) });
    }

    return icon
};