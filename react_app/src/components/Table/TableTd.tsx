import { AnchorHTMLAttributes } from 'react';

import classNames from 'classnames';

interface ITableTdProps extends AnchorHTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
  isCollapsable?: boolean;
  style?: React.CSSProperties;
}

const TableTd = ({ children, colSpan = 1, isCollapsable = false, style }: ITableTdProps) => (
  <td
    className={classNames('table__td', {
      'table__td--collapsable': isCollapsable
    })}
    colSpan={colSpan}
    style={style}>
    {children}
  </td>
);

export default TableTd;
