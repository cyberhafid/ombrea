import { AnchorHTMLAttributes } from 'react';

type ITableHeadProps = AnchorHTMLAttributes<HTMLTableCellElement>;

const TableHead = ({ children }: ITableHeadProps) => <thead className="table__thead">{children}</thead>;

export default TableHead;
