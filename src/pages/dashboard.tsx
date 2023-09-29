import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useQuery } from 'react-query';

import GraphCard from '@/components/lib/graphCard/GraphCard';
import Header from '@/components/lib/header/Header';
import RecentActivity from '@/components/lib/recentActivity/RecentActivity';
import Search from '@/components/lib/search/Search';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';

import {
  getDemographicData,
  getOverViewData,
  getPlotData,
} from '@/services/dashboard';
import { PlotDataPoint } from '@/services/dashboard/payload';
import queryKeys from '@/utils/api/queryKeys';

function getTrendData(data: PlotDataPoint[]) {
  const dates = data.map((d) => d._id);
  const minDate = Math.min(...dates.map((date) => new Date(date).getTime()));
  const maxDate = Math.max(...dates.map((date) => new Date(date).getTime()));
  const dateRange = Array.from(
    { length: (maxDate - minDate) / (24 * 60 * 60 * 1000) + 1 },
    (_, i) => new Date(minDate + i * 24 * 60 * 60 * 1000)
  );
  const counts = dateRange.map((date) => {
    const matchingData = data.find(
      (d) => new Date(d._id).toDateString() === date.toDateString()
    );
    return matchingData ? matchingData.count : 0;
  });
  return counts;
}

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, stopDate] = dateRange;

  const handleDateChange = (date: [Date | null, Date | null]) => {
    setDateRange(date);
  };

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { data : jobData, isError, isLoading } = useQuery({
    queryKey: [queryKeys.getDashboardOverview, dateRange],
    queryFn: () =>
      getOverViewData({
        startDate: startDate?.toString(),
        stopDate: stopDate?.toString(),
      }),
  });
  const { data: demographicData } = useQuery({
    queryKey: [queryKeys.getDemographicData, dateRange],
    queryFn: () =>
      getDemographicData({
        startDate: startDate?.toString(),
        stopDate: stopDate?.toString(),
      }),
  });
  const { data: plotData } = useQuery({
    queryKey: [queryKeys.getPlotData, dateRange],
    queryFn: () =>
      getPlotData({
        startDate: startDate?.toString(),
        stopDate: stopDate?.toString(),
      }),
  });

  const dashboardData = [
    {
      title: 'Number of Applicants',
      number: demographicData?.length || 0,
      arrowImage: 'mdi:arrow-down',
      subTitle: 'New applicants in 30 days',
      smallNumber: `${demographicData?.length || 0}%`,
      graphStroke: 'red',
      graphData: plotData ? getTrendData(plotData?.candidatePlot) : [],
    },
    {
      title: 'Number of Jobs',
      number: jobData?.length || 0, 
      subTitle: 'New jobs in 30 days',
      arrowImage: 'mdi:arrow-up',
      smallNumber: `${demographicData?.length || 0}%`,
      graphStroke: 'blue',
      graphData: plotData ? getTrendData(plotData?.hirePlot) : [],
    },
  ];
  const thirdDashboardData = [
    {
      id: 1,
      title: 'Total No of Jobseekers ',
      // number: demographicData?.length || 0,
      number:  0,

      image: '/assets/svg/red-people.svg',
    },
    {
      id: 2,
      title: 'Total Hired ',
      // number: demographicData?.length || 0,
      number:  0,
      image: '/assets/svg/blue-people.svg',
    },
  ];

  return (
    <MainContentLayout>
      <div>
        <Header
          // component={
          //   <div className='flex items-center gap-2 px-4'>
          //     <Image
          //       src='/assets/svg/calender.svg'
          //       alt='calender'
          //       width={18}
          //       height={20}
          //     />
          //     <ReactDatePicker
          //       onChange={handleDateChange}
          //       startDate={startDate}
          //       endDate={stopDate}
          //       selectsRange={true}
          //       isClearable={true}
          //       showIcon={true}
          //       placeholderText='Feb 24 2023 -March 24 2023'
          //       dateFormat='yyyy/MM/dd'
          //       className=' h-full w-full rounded-[5px] border-none text-center outline-none'
          //       monthsShown={2}
          //       showYearDropdown
          //     />
          //   </div>
          // }
          text='Recruitment Dashboard'
          componentWidth='md:xw-[300px]'
        />

        <section className='mt-3'>
          <div className='grid grid-cols-1 gap-10 xl:grid-cols-3 xl:gap-14'>
            {dashboardData.map((item, index) => (
              <GraphCard key={index} {...item} />
            ))}

            <div className='graph-card px-8 py-7'>
              <div className='flex items-center justify-between'>
                <p className='text-[16px] font-[500]'>
                  Total Number of Candidates
                </p>
                <Icon icon='carbon:overflow-menu-vertical' />
              </div>
              <div className='mt-4 flex gap-4'>
                {thirdDashboardData.map((item, index) => (
                  <div
                    className='job-card h-max rounded-[10px] p-4  '
                    key={index}
                  >
                    <Image
                      src={item.image}
                      alt=''
                      width={40}
                      height={40}
                      className='mx-auto mb-2 block'
                    />
                    <p
                      className={
                        index === 0
                          ? 'mb-4 mt-0 font-light'
                          : 'mb-8 mt-4 font-light'
                      }
                    >
                      {item.title}
                    </p>
                    <p className='text-[30px] font-[700]'>{item.number}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className='mt-3   w-full  rounded-[10px] bg-white p-10 shadow-lg'>
            <div className='md:flex justify-between'>
              <p className='text-[20px] '>Recruitment Overview</p>
              <div className='flex gap-4'>
                <button className='h-[40px] w-[102px] rounded-[5px] bg-bg text-ace-black'>
                  <span>View All</span>
                </button>
                <Search className='w-[252px]' />
              </div>
            </div>
            {/* <RecentActivity data={jobData} /> */}
          </div>
        </section>
      </div>
    </MainContentLayout>
  );
};

export default Dashboard;
