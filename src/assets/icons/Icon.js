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
