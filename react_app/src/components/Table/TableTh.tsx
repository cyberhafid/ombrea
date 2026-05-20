import { AnchorHTMLAttributes } from 'react';

type ITableThProps = AnchorHTMLAttributes<HTMLTableCellElement>;

const TableTh = ({ children }: ITableThProps) => <th className="table__th">{children}</th>;

export default TableTh;
