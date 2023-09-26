import { Icon } from '@iconify/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import useDeleteCandidate from '@/hooks/useDeleteCandidate';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import useUpdateJobStatus from '@/hooks/useUpdateJobStatus';

import ActionAlert from '@/components/lib/modals/DeleteAlert';
import HireOrInterviewAlert from '@/components/lib/modals/HireOrInterviewAlert';
import { QualifiedCandidateProps } from '@/components/lib/qualifiedCandidates/type';
import StatusBar from '@/components/lib/statusBar/StatusBar';
import Table from '@/components/shared/Table';
import TableBody from '@/components/shared/Table/TableBody';
import TableCell from '@/components/shared/Table/TableCell';
import TableHeader from '@/components/shared/Table/TableHeader';
import TableRow from '@/components/shared/Table/TableRow';

const QualifiedCandidates: React.FC<QualifiedCandidateProps> = ({ data }) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [id, setId] = React.useState<number[]>([]);
  const [showTip, setShowTip] = useState(true);
  const [currentId, setCurrentId] = useState('');
  const tipRef = useRef<null | HTMLDivElement>(null);
  const [status, setStatus] = useState('');
  const [hireModal, setHireModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [candidateToActOn, setCandidateToActOn] = useState({
    fullName: '',
    last: '',
    id: '',
  });

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

  const { handleDeleteCandidate, isLoading } = useDeleteCandidate({
    queryKey: 'delete',
  });

  const {
    handleUpdateJobStatus,
    isLoading: updateJobLoading,
    isSuccess,
  } = useUpdateJobStatus(candidateToActOn.id, status);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Candidate updated successfully!');
      setHireModal(false);
    }
  }, [isSuccess]);

  useOnClickOutside(tipRef, () => setShowTip(false));

  // const router = useRouter();

  if (data && data.length < 1) {
    return (
      <div className='flex h-60 items-center justify-center'>
        <p> No Qualified Candidates for this job</p>
      </div>
    );
  }
  return (
    <div className=' grid w-full gap-10 '>
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
          {data &&
            data.map((candidate, index) => (
              <TableRow
                bg2={id.includes(Number(candidate._id)) ? '#899bff' : ''}
                key={index}
              >
                <TableCell>
                  <input
                    type='checkbox'
                    className='cursor-pointer bg-transparent bg-white'
                    checked={id.includes(Number(candidate._id))}
                    onClick={() => checkIfItExists(Number(candidate._id))}
                  />
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <div className='relative h-[28px] w-[28px] rounded-full'>
                      <Image
                        src={candidate.profileImage}
                        alt='image'
                        fill={true}
                        className='rounded-full object-cover'
                      />
                    </div>
                    <p className='cursor-pointer'>
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
                        : candidate.jobStatus === 'Verified'
                        ? '/assets/svg/person-verified.svg'
                        : '/assets/svg/person-logo.svg'
                    }
                    alt='person'
                    width={25}
                    height={25}
                    className='mx-auto block'
                  />
                </TableCell>
                <TableCell>{candidate.state}</TableCell>
                <TableCell>{candidate.gender}</TableCell>
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
                        className='absolute -right-0 z-[999]  w-[117px] rounded-[5px] bg-white  p-4 text-[12px] text-ace-black shadow'
                      >
                        <div>
                          <div
                            onClick={() => {
                              setHireModal(true);

                              setStatus('Interview');
                              setCandidateToActOn({
                                fullName: candidate.firstName,
                                last: candidate.lastName,
                                id: candidate._id,
                              });
                            }}
                            className='flex cursor-pointer items-center  gap-3'
                          >
                            <Image
                              src='/assets/svg/interview-logo.svg'
                              alt='archive'
                              width={15}
                              height={15}
                            />
                            <p>Interview</p>
                          </div>
                          <div
                            onClick={() => {
                              setHireModal(true);

                              setStatus('Hired');
                              setCandidateToActOn({
                                fullName: candidate.firstName,
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
                            <p>Hire</p>
                          </div>
                          <div
                            onClick={() => {
                              setOpenDeleteModal(true);
                              // setCandidateToActOn({
                              //   first: candidate.firstName,
                              //   last: candidate.lastName,
                              //   id: candidate._id,
                              // });
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
      <ActionAlert
        isOpen={openDeleteModal}
        handleCloseModal={() => setOpenDeleteModal(false)}
        candidate={candidateToActOn}
        deleteFn={handleDeleteCandidate}
        loading={isLoading}
      />
      {/* <HireOrInterviewAlert
        isOpen={hireModal}
        handleCloseModal={() => setHireModal(false)}
        candidate={candidateToActOn}
        hireFn={handleUpdateJobStatus}
        loading={updateJobLoading}
        status={status}
      /> */}
    </div>
  );
};

export default QualifiedCandidates;
