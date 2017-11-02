//React
import React from 'react';
import { shape, string, func } from 'prop-types'
//Components
import '../../assets/styles/react-table.css';

const Search = ({ searchString, actions }) => {
    return (
        <div>
            <input onChange={ actions.searchRows } value={ searchString }/>
            <button className="btn btn-primary" onClick={ actions.clearSearch }>Clear</button>
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
