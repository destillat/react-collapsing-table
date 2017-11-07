//React
import React from 'react';
import { shape, string, func } from 'prop-types'
//Components
import '../../assets/styles/react-table.css';

const Search = ({ searchString, actions }) => {
    return (
        <div className="react-collapsible-search">
            <input onChange={ actions.searchRows } value={ searchString }/>
            <button className="clear" onClick={ actions.clearSearch }>&#9587;</button>
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
