//React
import React from 'react';
import { shape, string, func } from 'prop-types'
//Components

const Search = ({ searchString, searchRows, clearSearch }) => {
    return (
        <div className="react-collapsible-search">
            <input onChange={ searchRows } value={ searchString } placeholder="search"/>
            <button className="clear" onClick={ clearSearch }>&#9587;</button>
        </div>
    );
};

Search.PropTypes = {
    searchString: string.isRequired,
    actions: shape({
        sortColumn: func.isRequired,
        previousPage: func.isRequired,
        nextPage: func.isRequired,
    })
};

export default Search
