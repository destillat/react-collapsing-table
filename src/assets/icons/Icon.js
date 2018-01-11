//React
import React from 'react';
//Imported Icons
import OpenRow from 'react-icons/lib/md/keyboard-arrow-down';
import CloseRow from 'react-icons/lib/md/keyboard-arrow-up';
import CaretUp from 'react-icons/lib/fa/caret-up';
import CaretDown from 'react-icons/lib/fa/caret-down';
import ChevronLeft from 'react-icons/lib/fa/chevron-left';
import ChevronRight from 'react-icons/lib/fa/chevron-right';

export const getIcon = ({ onClick, name='', size=16 }) => {
    switch (name) {
        case 'OpenRow':
            return <span><OpenRow onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'CloseRow':
            return <span><CloseRow onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'ascending':
            return <span><CaretUp onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'descending':
            return <span><CaretDown onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'leftChevron':
            return <span className="arrow-left"><ChevronLeft onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        case 'rightChevron':
            return <span className="arrow-right"><ChevronRight onClick={ onClick } size={ size } className="brand-primary-light" /></span>;
        default:
            return <span />;
    }
};

export const expandIcon = ({ cellIndex, rowIndex, row, hiddenColumnsLength, expandRow }) => {
    const name = row.isOpen ? 'CloseRow' : 'OpenRow';
    const IS_FIRST_CELL = cellIndex === 0;
    const IS_HIDDEN_COULMNS = hiddenColumnsLength > 0;
    const IS_NOT_EMPTY_ROW = Object.keys(row).length > 1;

    if(IS_FIRST_CELL && IS_HIDDEN_COULMNS && IS_NOT_EMPTY_ROW){
        return getIcon({ name, onClick: () => expandRow({ rowIndex }) });
    }

    return getIcon({ onClick: {}, name: 'none' });
};

export const sortDirection = ({ direction='none', size=20 }) => {
    switch (direction) {
        case 'ascending':
            return <span><CloseRow size={ size } className="brand-primary-light" /></span>;
        case 'descending':
            return <span><OpenRow size={ size } className="brand-primary-light" /></span>;
        default:
            return <span />;
    }
};
