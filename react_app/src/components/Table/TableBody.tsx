import { AnchorHTMLAttributes } from 'react';

type ITableBodyProps = AnchorHTMLAttributes<HTMLTableCellElement>;

const TableBody = ({ children }: ITableBodyProps) => <thead className="table-ob__tbody">{children}</thead>;

export default TableBody;
