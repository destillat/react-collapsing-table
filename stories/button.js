import React from 'react';

const Button = ({ row, accessor, cellIndex, rowIndex, CustomFunction, }) => {
  return(
    <span>
      { row[accessor] }
      <button onClick={ () => CustomFunction({ rowIndex, cellIndex }) }>send</button>
    </span>
  )
}
export default Button
