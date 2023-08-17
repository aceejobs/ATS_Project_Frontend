import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

import useArchiveCandidate from '@/hooks/useArchiveCandidate';
import useDeleteCandidate from '@/hooks/useDeleteCandidate';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useSearchCandidate } from '@/hooks/useSearchCandidate';

import ArchiveAlert from '@/components/lib/modals/ArchiveAlert';
import ActionAlert from '@/components/lib/modals/DeleteAlert';
import StatusBar from '@/components/lib/statusBar/StatusBar';
import Table from '@/components/shared/Table';
import TableBody from '@/components/shared/Table/TableBody';
import TableCell from '@/components/shared/Table/TableCell';
import TableHeader from '@/components/shared/Table/TableHeader';
import TableRow from '@/components/shared/Table/TableRow';
import Skeleton from '@/components/Skeleton';

import { getActiveCandidates } from '@/services/candidate';
import queryKeys from '@/utils/api/queryKeys';
import { ICandidate, ICandidateFilter } from '@/utils/types';

const Candidates = ({ filterData }: { filterData: ICandidateFilter }) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [id, setId] = React.useState<number[]>([]);
  const [showTip, setShowTip] = useState(true);
  const [currentId, setCurrentId] = useState<string>();
  const tipRef = useRef<null | HTMLDivElement>(null);
  const [candidateToActOn, setCandidateToActOn] = useState({
    first: '',
    last: '',
    id: '',
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const filteredQueryKey = [...queryKeys.getActiveCandidates, filterData];
  const { data } = useQuery({
    queryFn: () => getActiveCandidates(filterData),
    queryKey: filteredQueryKey,
  });

  const { handleDeleteCandidate, isLoading, isSuccess } = useDeleteCandidate({
    queryKey: filteredQueryKey,
  });

  const {
    handleArchiveCandidate,
    isLoading: archiveLoading,
    isSuccess: archiveSuccess,
  } = useArchiveCandidate();

  const { filteredData } = useSearchCandidate(data);

  useEffect(() => {
    if (isSuccess) {
      setOpenDeleteModal(false);
      toast.success('Candidate Deleted Successfully');
    }
    if (archiveSuccess) {
      setOpenArchiveModal(false);
      toast.success('Candidate Archived Successfully');
    }
  }, [isSuccess, archiveSuccess]);

  const checkIfItExists = (itemId: number) => {
    if (id?.includes(itemId)) {
      return id?.splice(id?.indexOf(itemId), 1);
      //  return  id.filter((item) => item !== itemId);
    } else {
      setId((prev) => {
        return [...prev, itemId];
      });
    }
  };

  useOnClickOutside(tipRef, () => setShowTip(false));

  const router = useRouter();

  return (
    <div className=' grid w-full gap-10 '>
      {data ? (
        <Table>
          <TableHeader
            items={[
              '',
              'Candidate',
              'Role',
              'Verification Status',
              'Job Status',
              'Location',
              'Gender',
            ]}
          />
          <TableBody>
            {filteredData?.map((candidate: ICandidate, index: number) => (
              <TableRow
                bg2={id.includes(index) ? '#899bff' : ''}
                key={candidate._id}
              >
                <TableCell>
                  <input
                    type='checkbox'
                    className='cursor-pointer bg-transparent bg-white'
                    checked={id.includes(index)}
                    onClick={() => checkIfItExists(index)}
                  />
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <div className='relative h-[28px] w-[28px]  '>
                      <Image
                        src={candidate.profileImage}
                        alt='image'
                        fill={true}
                        className='rounded-full object-cover'
                      />
                    </div>
                    <p
                      className='cursor-pointer'
                      onClick={() =>
                        router.push(`/candidates/active/${candidate._id}`)
                      }
                    >
                      {candidate.firstName} {candidate.lastName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{candidate.profession}</TableCell>
                <TableCell>
                  <StatusBar text={candidate.verificationStatus} />
                </TableCell>
                <TableCell>
                  <Image
                    src={
                      candidate.jobStatus === 'Interview'
                        ? '/assets/svg/interview-logo.svg'
                        : candidate.jobStatus === 'Hired'
                        ? '/assets/svg/person-verified.svg'
                        : '/assets/svg/person-logo.svg'
                    }
                    alt='person'
                    width={25}
                    height={25}
                    className='mx-auto block'
                  />
                </TableCell>
                <TableCell>
                  {candidate.city}, {candidate.country}
                </TableCell>
                <TableCell>{candidate.gender}</TableCell>
                <TableCell>
                  <div ref={tipRef} className='relative'>
                    <Icon
                      data-tooltip-id='my-tooltip'
                      icon='carbon:overflow-menu-vertical'
                      className='cursor-pointer text-xl font-bold'
                      onClick={() => {
                        setShowTip(true);
                        setCurrentId(candidate._id);
                      }}
                    />
                    {showTip && currentId === candidate._id && (
                      <div
                        ref={tipRef}
                        className='absolute -right-0 z-[999] h-max w-[117px] rounded-[5px] bg-white  p-4 text-[12px] text-ace-black shadow'
                      >
                        <div>
                          {/* <button
                            onClick={() => {
                              setOpenArchiveModal(true);
                              setCandidateToActOn({
                                first: candidate.firstName,
                                last: candidate.lastName,
                                id: candidate._id,
                              });
                            }}
                            className=' mt-2 flex cursor-pointer items-center  gap-3'
                          >
                            <Image
                              src='/assets/svg/archive-2.svg'
                              alt='archive'
                              width={15}
                              height={15}
                            />
                            <p>Archive</p>
                          </button> */}
                          <button
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setCandidateToActOn({
                                first: candidate.firstName,
                                last: candidate.lastName,
                                id: candidate._id,
                              });
                            }}
                            className='mt-2 flex cursor-pointer items-center  gap-3'
                          >
                            <Image
                              src='/assets/svg/bin.svg'
                              alt='archive'
                              width={15}
                              height={15}
                            />
                            <p className='text-ace-red'>Delete</p>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Skeleton className='my-3 h-20 w-full' />
      )}

      <ActionAlert
        isOpen={openDeleteModal}
        handleCloseModal={() => setOpenDeleteModal(false)}
        candidate={candidateToActOn}
        deleteFn={handleDeleteCandidate}
        loading={isLoading}
      />
      <ArchiveAlert
        isOpen={openArchiveModal}
        handleCloseModal={() => setOpenArchiveModal(false)}
        candidate={candidateToActOn}
        archiveFn={handleArchiveCandidate}
        loading={archiveLoading}
      />
    </div>
  );
};

export default Candidates;
