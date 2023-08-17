import React from 'react';

import { useSearchActivity } from '@/hooks/useSearchActivity';

import { IData } from '@/components/lib/recentActivity/type';
import Table from '@/components/shared/Table';
import TableBody from '@/components/shared/Table/TableBody';
import TableCell from '@/components/shared/Table/TableCell';
import TableHeader from '@/components/shared/Table/TableHeader';
import TableRow from '@/components/shared/Table/TableRow';

const RecentActivity: React.FC<IData> = ({ data }) => {
  const { filteredData } = useSearchActivity(data);
  return (
    <div className=' grid w-full gap-10'>
      <Table>
        <TableHeader
          items={['Roles', 'Total No', 'Available', 'Interview', 'Hired']}
        />
        <TableBody>
          {filteredData &&
            filteredData.map((role, index) => (
              <TableRow key={index} className='bg-[#f4f4f4]'>
                <TableCell>
                  <p className='capitalize'>{role._id}</p>
                </TableCell>
                <TableCell>{role.total}</TableCell>
                <TableCell>{role.available}</TableCell>
                <TableCell>{role.interview}</TableCell>
                <TableCell>{role.hired}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentActivity;
