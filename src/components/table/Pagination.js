//React
import React from 'react';
import { shape, func, number } from 'prop-types'
//Components

const Pagination = ({ currentPage, actions }) => {
    return (
        <div>
            <button onClick={ actions.previousPage }>prev</button>
            <p>{ currentPage }</p>
            <button onClick={ actions.nextPage }>next</button>
        </div>
    );
};

Pagination.PropTypes = {
    currentPage: number.isRequierd,
    actions: shape({
        previousPage: func.isRequired,
        nextPage: func.isRequired,
    })
};

export default Pagination
