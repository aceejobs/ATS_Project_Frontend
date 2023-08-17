import type { FC } from 'react';

import styles from './Table.module.scss';

import type { TableHeadProps } from './TableProps';

const TableHeader: FC<TableHeadProps> = ({ items }) => {
  return (
    <thead>
      <tr className={styles.table__header_row}>
        {items.map((item, index) => (
          <th className={styles.table__header_cell} key={index}>
            <p className='font-semibold text-ace-blue'>{item}</p>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
