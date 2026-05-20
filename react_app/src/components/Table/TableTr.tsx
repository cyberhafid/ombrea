import { AnchorHTMLAttributes } from 'react';

type ITableTrProps = AnchorHTMLAttributes<HTMLTableRowElement>;

const TableTr = ({ children, className, onClick, onMouseEnter, onMouseLeave }: ITableTrProps) => (
  <tr
    className={`table__tr ${className || ''}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    role="button"
    tabIndex={0}>
    {children}
  </tr>
);

export default TableTr;
