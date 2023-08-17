import React from 'react';

export const FilterForActive = () => {
  return (
    <div className='absolute z-[999] mt-2 w-[540px] rounded-[5px] bg-white p-10 shadow'>
      <section className='grid grid-cols-3 gap-14'>
        <div>
          <p className='mb-3 '>Name</p>
          <div className='grid grid-cols-2 gap-6 text-[12px]'>
            <p>A - Z</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Z - A</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
        </div>
        <div>
          <p className='mb-3 '>Creation date</p>
          <div className='grid grid-cols-2 gap-6 text-[12px]'>
            <p>Earliest</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Latest</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
        </div>
        <div>
          <p className='mb-3 '>Job Status</p>
          <div className='grid grid-cols-2  gap-20  text-[12px]'>
            <p>Available </p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
          <div className='mt-2 grid  grid-cols-2 gap-20 text-[12px]'>
            <p>Interviewing</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
          <div className='mt-2 grid  grid-cols-2 gap-20 text-[12px]'>
            <p>Hired</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
        </div>
      </section>
      <section className='mt-14 grid grid-cols-3 gap-14'>
        <div>
          <p className='mb-3 '>Location</p>
          <div className='grid grid-cols-2 gap-6 text-[12px]'>
            <p>Abia</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Abuja</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Lagos</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Ogun</p>
            <input type='checkbox' className='mt-1 rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Osun</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
        </div>
        <div>
          <p className='mb-3 '>Role</p>
          <div className='grid grid-cols-2 gap-6 text-[12px]'>
            <p>Nanny</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Gateman</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Driver</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Manager</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
        </div>
        <div>
          <p className='mb-3 '>Verification</p>
          <div className='grid grid-cols-2 gap-20  whitespace-nowrap text-[12px]'>
            <p>Not Verified </p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-2 grid grid-cols-2 gap-20 text-[12px]'>
            <p>Verified</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-2 grid grid-cols-2 gap-20 whitespace-nowrap text-[12px]'>
            <p>In Progress</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
        </div>
      </section>
    </div>
  );
};

export const InactiveFilter = () => {
  return (
    <div className='absolute z-[999] mt-2 w-[380px] rounded-[5px] bg-white p-10 shadow'>
      <section className='grid grid-cols-2 gap-3'>
        <div>
          <p className='mb-3 '>Name</p>
          <div className='grid grid-cols-2 gap-6 text-[12px]'>
            <p>A - Z</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Z - A</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
        </div>
        <div>
          <p className='mb-3 '>Creation date</p>
          <div className='grid grid-cols-2 gap-6 text-[12px]'>
            <p>Earliest</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Latest</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
        </div>
      </section>
      <section className='mt-14 grid grid-cols-2 gap-3'>
        <div>
          <p className='mb-3 '>Creator</p>
          <div className='grid grid-cols-2 gap-6 text-[12px]'>
            <p>Abia</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-3 grid grid-cols-2 gap-6 text-[12px]'>
            <p>Abuja</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
        </div>

        <div>
          <p className='mb-3 '>Profile Status</p>
          <div className='grid grid-cols-2 gap-10  whitespace-nowrap text-[12px]'>
            <p>In Complete</p>

            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-2 grid grid-cols-2 gap-10 text-[12px]'>
            <p>Completed </p>

            <input type='checkbox' className='rounded-[2px]' />
          </div>
          <div className='mt-2 grid grid-cols-2 gap-10 whitespace-nowrap text-[12px]'>
            <p>In Progress</p>
            <input type='checkbox' className='rounded-[2px]' />
          </div>
        </div>
      </section>
    </div>
  );
};

export const JobsFilter = () => {
  return (
    <div>
      <p className='mb-3'>Sort By:</p>
      <div>
        <p className='mb-2 '>Creation Date</p>
        <div className='grid grid-cols-2 gap-6 text-[12px]'>
          <p>All</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Earliest</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Latest</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
      </div>

      {/*  */}

      <div className='mt-4'>
        <p className='mb-2 '>Availability</p>
        <div className='grid grid-cols-2 gap-6 text-[12px]'>
          <p>All</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Available </p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Closed</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
      </div>

      {/*  */}

      <div className='mt-4'>
        <p className='mb-2 '>Roles</p>
        <div className='grid grid-cols-2 gap-6 text-[12px]'>
          <p>Driver</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Chef </p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Manager</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Cleaner</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>GateMan</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Nanny</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
      </div>

      {/*  */}

      <div className='mt-4'>
        <p className='mb-2 '>Job Types</p>
        <div className='grid grid-cols-2 gap-6 text-[12px]'>
          <p>All</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Full Time </p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Part Time</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Internship</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-6 text-[12px]'>
          <p>Contract</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
      </div>

      {/*  */}

      <div className='mt-4 whitespace-nowrap '>
        <p className='mb-2 '>Salary</p>
        <div className='grid w-full grid-cols-2 gap-28 text-[12px]'>
          <p>₦50,000 - ₦100,000</p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
        <div className='mt-2 grid grid-cols-2 gap-28 text-[12px]'>
          <p>₦150,000 - ₦300,000 </p>
          <input
            type='checkbox'
            className='mt-1 rounded-[2px] border-ace-blue bg-transparent'
          />
        </div>
      </div>
    </div>
  );
};
