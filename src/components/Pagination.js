//React
import React from 'react';
import { PaginationPropType } from '../utils/propTypes'
//Components
import { getIcon } from '../assets/icons/Icon';

const Pagination = ({ currentPage, totalRows, rowSize, nextPage, previousPage }) => {
    const totalPages = Math.ceil(totalRows / rowSize)

    const previousPageIcon = currentPage > 1 ?
        getIcon({ name: 'leftChevron', onClick: previousPage }) : null;
    const nextPageIcon = currentPage < totalPages ?
        getIcon({ name: 'rightChevron', onClick: nextPage }) : null;

    return (
        <div className="react-collapsible-page">
            <p>
                { previousPageIcon }
                Page { currentPage } of { totalPages }
                { nextPageIcon }
            </p>
        </div>
    );
};

Pagination.propTypes = PaginationPropType;

export default Pagination
