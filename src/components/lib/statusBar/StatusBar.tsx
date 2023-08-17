import { Icon } from '@iconify/react';
import React from 'react';

import { StatusBarProps } from '@/components/lib/statusBar/type';

const StatusBar: React.FC<StatusBarProps> = ({ text }) => {
  return (
    <div
      className={
        text === 'Verified'
          ? 'mx-auto w-[116px] rounded-[5px] border border-ace-green bg-[#d9efe8] p-[0.35rem] text-ace-green'
          : text === 'In Progress'
          ? 'mx-auto w-[116px] rounded-[5px] border border-[#FFCC00] bg-[#f6f0da] p-[0.35rem] text-[#FFCC00]'
          : 'mx-auto flex w-[116px] items-center justify-center gap-2 rounded-[5px] border border-ace-red  bg-[#fadbdb] p-[0.35rem] text-ace-red'
      }
    >
      <p>{text}</p>
      {text === 'Inactive' && (
        <Icon
          icon='material-symbols:keyboard-arrow-down-sharp'
          className='text-xl'
        />
      )}
    </div>
  );
};

export default StatusBar;
