import React from 'react';

const Link = ({ row, accessor, cellIndex, rowIndex, expandRow, hiddenColumnsLength, CustomFunction, }) => {
  return(
    <a href={ CustomFunction() }>{row[accessor]}</a>
  )
}
export default Link
