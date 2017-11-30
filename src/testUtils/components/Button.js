import React from 'react';

const Button = ({ row, accessor, CustomFunction }) => {
  return <button onClick={ CustomFunction }>{ row[accessor] }</button>
};

export default Button;
