import React from 'react';

import AddCandidatesForm from '@/components/lib/addCandidatesForm/AddCandidatesForm';
import Header from '@/components/lib/header/Header';
import MainContentLayout from '@/components/shared/MainContentLayout/MainContentLayout';

const AddCandidates = () => {
  return (
    <MainContentLayout>
      <Header text='Candidate Details' add />

      <div className='mt-3     w-full rounded-[10px] bg-white py-10 px-20 shadow-lg'>
        <AddCandidatesForm />
      </div>
    </MainContentLayout>
  );
};

export default AddCandidates;
