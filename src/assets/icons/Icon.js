//React
import React from 'react';
//Imported Icons
import OpenRow from 'react-icons/lib/md/keyboard-arrow-down';
import CloseRow from 'react-icons/lib/md/keyboard-arrow-up';
import CaretUp from 'react-icons/lib/fa/caret-up';
import CaretDown from 'react-icons/lib/fa/caret-down';

export const getIcon = ({ onClick, name='', size=16 }) => {
    switch (name) {
        case 'OpenRow':
            return <span><OpenRow onClick={ onClick } size={ size }/></span>;
        case 'CloseRow':
            return <span><CloseRow onClick={ onClick } size={ size }/></span>;
        case 'ascending':
            return <span><CaretUp onClick={ onClick } size={ size }/></span>;
        case 'descending':
            return <span><CaretDown onClick={ onClick } size={ size }/></span>;
        default:
            return <span />;
    }
};

export const expandIcon = ({ cellIndex, rowIndex, row, hiddenColumnsLength, actions }) => {
    const name = row.isOpen ? 'CloseRow' : 'OpenRow';
    const IS_FIRST_CELL = cellIndex === 0;
    const IS_HIDDEN_COULMNS = hiddenColumnsLength > 0;
    const IS_NOT_EMPTY_ROW = Object.keys(row).length > 1;

    if(IS_FIRST_CELL && IS_HIDDEN_COULMNS && IS_NOT_EMPTY_ROW){
        return getIcon({ name, onClick: () => actions.expandRow({ rowIndex }) });
    }

    return getIcon({ onClick: {}, name: 'none' });
};

export const sortDirection = ({ direction='none', size=20 }) => {
    switch (direction) {
        case 'ascending':
            return <span><CaretUp size={ size }/></span>;
        case 'descending':
            return <span><CaretDown size={ size }/></span>;
        default:
            return <span />;
    }
};
