import { HTMLAttributes, useState } from 'react';

import { IconFilter } from '../Icons/IconFilter';
// import { useClickOutside } from '@hooks';
import { Button, Radio, RadioChangeEvent } from 'antd';
import classNames from 'classnames';

import './Table.scss';

interface ITableFilterProps extends HTMLAttributes<HTMLDivElement> {
  filters: { label: string; value: string }[];
  onFilter: (value: string) => void;
}

const TableFilter = ({ filters, children, onFilter }: ITableFilterProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [optionsSelected, setOptionsSelected] = useState<string>('');

  // const { ref: refDropdown } = useClickOutside(showDropdown, setShowDropdown);

  const hideDropdown = () => {
    setShowDropdown(false);
  };

  const handlerFilter = (event: RadioChangeEvent) => {
    setOptionsSelected(event.target.value);
  };

  const emitFilter = () => {
    onFilter(optionsSelected);
    hideDropdown();
  };

  const resetFilter = () => {
    setOptionsSelected('');
    onFilter('');
    hideDropdown();
  };

  return (
    <div className="table-filter flex justify-between">
      <div>{children}</div>
      <div>
        <button
          className={classNames('table-filter__icon', {
            'table-filter__icon--active': optionsSelected.length > 0
          })}
          onClick={() => setShowDropdown(!showDropdown)}
          type="button">
          <IconFilter height={16} width={16} />
        </button>
        {/* {showDropdown && (
          <div className="dropdown" ref={refDropdown}>
            <div className="dropdown__container">
              <Radio.Group onChange={(values) => handlerFilter(values)} value={optionsSelected}>
                {filters.map((filter) => (
                  <Radio className="radio" key={filter.value} value={filter.value}>
                    {filter.label}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div className="dropdown__footer flex justify-between">
              <Button onClick={() => resetFilter()} size="small" type="link">
                Reset
              </Button>
              <Button disabled={optionsSelected.length === 0} onClick={() => emitFilter()} size="small" type="primary">
                Ok
              </Button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TableFilter;
