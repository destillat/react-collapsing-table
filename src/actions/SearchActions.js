const _ = require('lodash');

export const length = (x) => x.length
export const sum = (a, b) => a+b
export const indexesOf = (substr) => ({
  in: (str) => (
    str
    .split(substr)
    .slice(0, -1)
    .map(length)
    .map((_, i, lengths) => (
      lengths
      .slice(0, i+1)
      .reduce(sum, i*substr.length)
    ))
  )
});

export const insert = (str, index, value) => {
    return str.substr(0, index) + value + str.substr(index);
}

export const searchRows = ({ searchString, state }) => {
  let rows = _.cloneDeep(state.initialRows);
  const { columns } = state;
  const upperCaseSearchString = searchString.toUpperCase();

  rows = rows.filter( row => {
    const { flag, updatedRow } = searchRow({ row, upperCaseSearchString, columns })

    return flag ? updatedRow : false;
    });
  return { ...state, searchString, rows };
}

export const searchRow = ({ row, upperCaseSearchString, columns }) => {
  let flag = false;
  columns.map(({ accessor }) => {
    const { anyIndexes, newRowValue } = checkForSearchTerm({ key: accessor, value: row[accessor], upperCaseSearchString });
    if(anyIndexes) flag = true;
    row[accessor] = newRowValue;
  });
  return { updatedRow: row, flag }
};

//TODO: handle more than strings
export const checkForSearchTerm = ({ key, value, upperCaseSearchString }) => {
  try {
    let indexes;
    if (value === undefined) return { anyIndexes: false, newRowValue: '' }
    let rowValue = value;
    const currentCell = rowValue.toUpperCase();
    indexes = indexesOf(upperCaseSearchString).in(currentCell);
    const { anyIndexes, newRowValue } = tryToInsertSpan({ indexes, rowValue: value, searchString: upperCaseSearchString });
    return { anyIndexes, newRowValue }
  } catch(error) {
    return { anyIndexes: false, newRowValue: '' }
  }
};

export const tryToInsertSpan = ({ indexes, rowValue, searchString }) => {
  if( indexes.length > 0){
    for(let i = indexes.length -1; i >= 0; i--){
      rowValue = insert(rowValue, indexes[i] + searchString.length, '</span>')
      rowValue = insert(rowValue, indexes[i], '<span class="highlight">')
    }
    return { anyIndexes: true, newRowValue: rowValue }
  }
  return { anyIndexes: false, newRowValue: rowValue }
}

export const clearSearch = ({ state }) => {
    return {
      ...state,
      searchString: '',
      rows: _.cloneDeep(state.initialRows),
      pagination: { ...state.pagination, currentPage: 1, }
    };
};
