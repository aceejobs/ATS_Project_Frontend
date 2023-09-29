import { Icon } from '@iconify/react';
import React from 'react';
import { Area, AreaChart } from 'recharts';

import { GraphCardProps } from '@/components/lib/graphCard/type';

const GraphCard: React.FC<GraphCardProps> = ({
  arrowImage,
  graphStroke,
  graphData,
  smallNumber,
  number,
  subTitle,
  title,
}) => {
  return (
    <div className='graph-card  md:h-[290px] md:w-[392px] pt-8 '>
      <div className='px-10'>
        <p className='text-[16px] font-[500]'>{title}</p>
        <div className='mt-8 flex items-center gap-4'>
          <p className='text-[34px] font-[600]'>{number}</p>
          <div className='flex items-center gap-1'>
            <Icon
              icon={arrowImage}
              className={
                +smallNumber > 0
                  ? 'text-[12px] text-ace-green'
                  : +smallNumber < 0
                  ? 'text-[12px] text-ace-red'
                  : 'text-[12px]'
              }
            />
            <p
              className={
                +smallNumber > 0
                  ? 'text-[12px] text-ace-green'
                  : +smallNumber < 0
                  ? 'text-[12px] text-ace-red'
                  : 'text-[12px]'
              }
            >
              {smallNumber}
            </p>
          </div>
        </div>
        <p className='mt-4 text-[12px]'>{subTitle}</p>
      </div>
      <div className='w-full'>
        <AreaChart
          width={392}
          height={120}
          data={graphData.map((count) => ({ count }))}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={graphStroke} stopOpacity={0.8} />
              <stop offset='95%' stopColor={graphStroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            dataKey='count'
            stroke={graphStroke}
            fillOpacity={1}
            fill='url(#colorUv)'
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default GraphCard;
