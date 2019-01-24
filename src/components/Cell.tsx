//React
import React from 'react';
//Components
import { expandIcon } from '../assets/icons/Icon';

export default class Cell extends React.PureComponent<CellProps> {
    render() {
        const { 
            row, 
            accessor, 
            cellIndex, 
            rowIndex, 
            expandRow, 
            hiddenColumnsLength, 
            CustomComponent, 
            CustomFunction, 
            icons 
        } = this.props;

        const icon = expandIcon({ cellIndex, rowIndex, row, hiddenColumnsLength, expandRow, icons });
        const content = CustomComponent === undefined
                    ? <span dangerouslySetInnerHTML={{ __html: row[accessor] }} />
                    : <CustomComponent row={ row }
                                    rowIndex={ rowIndex }
                                    cellIndex={ cellIndex }
                                    accessor={ accessor }
                                    CustomFunction={ CustomFunction } />
        return <td className={ accessor }>{ icon }{ content }</td>;
    }
};

interface CellProps {
    readonly row: object;
    readonly accessor: string,
    readonly cellIndex: number,
    readonly rowIndex: number,
    // expandRow: 
    readonly hiddenColumnsLength: number,
    readonly CustomCompononet?: React.ReactNode || false,
    // readonly CustomFunction?:  
    // icons?: 
}