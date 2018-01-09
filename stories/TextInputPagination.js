import React from 'react';

const TextInputPagination = ({ currentPage, currentPageTemp, totalPages, nextPage, previousPage, goToPage }) => {
    const firstPage = <span onClick={ () => goToPage({newPage: 1 }) }>First Page-</span>;
    const previousPageIcon = currentPage > 1 ?
        <span onClick={ previousPage }>-Previous Page-</span> : null;
    const nextPageIcon = currentPage < totalPages ?
        <span onClick={ nextPage }>-Next Page-</span> : null;
    const lastPage = <span onClick={ () => goToPage({newPage: totalPages }) }>-Last Page</span>;

    return(
        <div className="react-collapsible-page">
            <p>
                { firstPage }
                { previousPageIcon }
                Page <input onChange={ goToPage } onKeyPress={ goToPage } value={ currentPageTemp } /> of { totalPages }
                { nextPageIcon }
                { lastPage }
            </p>
        </div>
    )
};

export default TextInputPagination