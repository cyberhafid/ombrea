import { TableHTMLAttributes } from 'react';

import classNames from 'classnames';

import TableBody from './TableBody';
import TableFilter from './TableFilter';
import TableHead from './TableHead';
import TableTd from './TableTd';
import TableTh from './TableTh';
import TableTr from './TableTr';

import './Table.scss';

interface ITableObProps extends TableHTMLAttributes<HTMLTableElement> {
  size?: 'small' | 'default';
}

export const TableOb = ({ children, size = 'default' }: ITableObProps) => (
  <div className="table-ob">
    <div className="table-container">
      <table
        className={classNames('table', {
          'table--small': size === 'small'
        })}>
        {children}
      </table>
    </div>
  </div>
);

TableOb.Thead = TableHead;
TableOb.Tbody = TableBody;
TableOb.Tr = TableTr;
TableOb.Th = TableTh;
TableOb.Td = TableTd;
TableOb.Filter = TableFilter;