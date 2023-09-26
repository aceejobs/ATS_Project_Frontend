import { Icon } from '@iconify/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

import useDeleteCandidate from '@/hooks/useDeleteCandidate';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useSearchCandidate } from '@/hooks/useSearchCandidate';

import ActivationAlert from '@/components/lib/modals/ActivationAlert';
import ActionAlert from '@/components/lib/modals/DeleteAlert';
import StatusBar from '@/components/lib/statusBar/StatusBar';
import Table from '@/components/shared/Table';
import TableBody from '@/components/shared/Table/TableBody';
import TableCell from '@/components/shared/Table/TableCell';
import TableHeader from '@/components/shared/Table/TableHeader';
import TableRow from '@/components/shared/Table/TableRow';
import Skeleton from '@/components/Skeleton';

import { getInactiveCandidates } from '@/services/candidate';
import queryKeys from '@/utils/api/queryKeys';
import { ICandidate, ICandidateFilter } from '@/utils/types';

const InactiveCandidate = ({
  filterData,
}: {
  filterData: ICandidateFilter;
}) => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [candidateToActOn, setCandidateToActOn] = useState({
    id: '',
  fullName: "",
  });

  const [id, setId] = React.useState<string[]>([]);
  const [candidateToActivate, setCandidateToActivate] =
    useState<ICandidate | null>(null);
  const [showTip, setShowTip] = useState(true);
  const [currentId, setCurrentId] = useState<string>();
  const tipRef = useRef<null | HTMLDivElement>(null);
  // const filteredQueryKey = [...queryKeys.getInactiveCandidates, filterData];

  const { data } = useQuery({
    queryFn: () => getInactiveCandidates(filterData),
    queryKey: queryKeys.getInactiveCandidates,
  });

  const handleCloseModal = () => {
    setCandidateToActivate(null);
  };

  useOnClickOutside(tipRef, () => setShowTip(false));

  const checkIfItExists = (itemId: string) => {
    if (id?.includes(itemId)) {
      return id?.splice(id?.indexOf(itemId), 1);
      //  return  id.filter((item) => item !== itemId);
    } else {
      setId((prev) => {
        return [...prev, itemId];
      });
    }
  };

  const { handleDeleteCandidate, isLoading, isSuccess } = useDeleteCandidate({
    queryKey: queryKeys.getInactiveCandidates,
  });

  const { filteredData } = useSearchCandidate(data);

  useEffect(() => {
    if (isSuccess) {
      setOpenDeleteModal(false);
      toast.success('Candidate Deleted Successfully');
    }
  }, [isSuccess]);
  return (
    <div>
      <div className=' grid w-full gap-10 '>
        {data ? (
          <Table>
            <TableHeader
              items={[
                '',
                'Candidate',
                'Role',
                'Date Created',
                'Profile Status',
                'Creator',
                'Mode',
                // '',
              ]}
            />
            <TableBody>
              {filteredData?.map((candidate: ICandidate) => (
                <TableRow
                  bg2={id.includes(candidate._id) ? '#899bff' : ''}
                  key={candidate._id}
                >
                  <TableCell>
                    <input
                      type='checkbox'
                      className='cursor-pointer bg-transparent bg-white'
                      checked={id?.includes(candidate._id)}
                      onClick={() => checkIfItExists(candidate._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <div className='relative h-[28px] w-[28px] '>
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
                          router.push(`/candidates/in-active/${candidate._id}`)
                        }
                      >
                        {candidate.firstName} {candidate.lastName}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.profession}</TableCell>
                  <TableCell>
                    {moment(candidate.createdAt).format('YYYY-MM-DD ')}
                  </TableCell>

                  <TableCell>{candidate.profileStatus}</TableCell>
                  <TableCell>
                    {candidate.staffId?.firstName} {candidate.staffId?.lastName}
                  </TableCell>
                  <TableCell>
                    <div
                      className={
                        candidate.profileMode === 'Inactive'
                          ? 'cursor-pointer '
                          : ''
                      }
                      onClick={() => {
                        if (candidate.profileMode === 'Inactive') {
                          setCandidateToActivate(candidate);
                        }
                      }}
                    >
                      <StatusBar text={candidate.profileMode} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div ref={tipRef} className='relative'>
                      <Icon
                        data-tooltip-id='my-tooltip'
                        icon='carbon:overflow-menu-vertical'
                        className='cursor-pointer text-xl'
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
                            {/* <div className=' mt-2 flex cursor-pointer items-center  gap-3'>
                              <Image
                                src='/assets/svg/archive-2.svg'
                                alt='archive'
                                width={15}
                                height={15}
                              />
                              <p>Archive</p>
                            </div> */}
                            <div
                              onClick={() => {
                                // handleDeleteCandidate(candidate._id);
                                setOpenDeleteModal(true);
                                setCandidateToActOn({
                                  fullName: candidate.lastName,
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
                            </div>
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
      </div>
      <ActivationAlert
        candidate={candidateToActivate}
        isOpen={!!candidateToActivate}
        handleCloseModal={handleCloseModal}
      />

      <ActionAlert
        isOpen={openDeleteModal}
        handleCloseModal={() => setOpenDeleteModal(false)}
        candidate={candidateToActOn}
        deleteFn={handleDeleteCandidate}
        loading={isLoading}
      />
    </div>
  );
};

export default InactiveCandidate;
