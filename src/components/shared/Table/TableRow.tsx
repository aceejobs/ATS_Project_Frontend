import type { FC, PropsWithChildren } from 'react';

import type { TableRowProps } from './TableProps';

const TableRow: FC<PropsWithChildren<TableRowProps>> = ({
  children,
  onClick,
  className,
  bg2,
}) => {
  return (
    <tr
      style={{
        backgroundColor: bg2 ? bg2 : '#f4f4f4',
      }}
      className={`${className} border-ace-grey/50 bg-transparent py-4 text-[14px]  font-light shadow-sm`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </tr>
  );
};

export default TableRow;
