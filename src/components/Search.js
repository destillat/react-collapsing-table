//React
import React from 'react';
import { SearchPropType } from '../utils/propTypes'
//Components

const Search = ({ searchString, searchRows, clearSearch }) => {
    return (
        <div className="react-collapsible-search">
            <input onChange={ searchRows } value={ searchString } placeholder="search"/>
            <button className="react-collapsible-clear" onClick={ clearSearch }>&#9587;</button>
        </div>
    );
};

Search.propTypes = SearchPropType;

export default Search
