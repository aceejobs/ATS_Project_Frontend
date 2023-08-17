import { Icon } from '@iconify/react';
import React from 'react';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import { useMutation, useQueryClient } from 'react-query';

import Button from '@/components/buttons/Button';
import { ModalWrapper } from '@/components/lib/modals/style';
import { GenModalProps } from '@/components/lib/modals/type';

import { activateCandidate } from '@/services/candidate';
import queryKeys from '@/utils/api/queryKeys';
import { ICandidate } from '@/utils/types';

const ActivationAlert: React.FC<
  GenModalProps & { candidate: ICandidate | null }
> = ({ candidate, handleCloseModal, isOpen }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: activateCandidate,
    onSuccess: () => {
      handleCloseModal();
      toast.success('Candidate has been successfully activated');
      queryClient.invalidateQueries(queryKeys.getInactiveCandidates);
    },
  });

  if (!candidate) return null;

  const handleActivateCandidate = () => {
    mutate(candidate._id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnEsc
      style={{
        overlay: {
          backgroundColor: '#00000020',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        },
        content: {
          outline: 'none',
        },
      }}
      shouldCloseOnOverlayClick={true}
      shouldReturnFocusAfterClose={true}
      ariaHideApp={false}
      className='h-max w-[90%] flex-shrink-0 rounded-[20px]  bg-white drop-shadow-2xl md:h-max lg:w-[485px]'
    >
      <ModalWrapper className='w-full py-[36px] px-[36px]'>
        <section>
          <div>
            <Icon
              icon='material-symbols:close'
              className='ml-auto cursor-pointer text-xl'
              onClick={handleCloseModal}
            />
            <p className='mt-6 text-center text-[20px] font-[600]'>
              Activation Alert
            </p>
            <p className='my-6 text-center text-[16px] font-[400]'>
              You are about to activate {candidate.firstName}{' '}
              {candidate.lastName}! Ensure you have confirmed that this
              candidate has made their payment. Click on continue to activate.
            </p>
          </div>
          <div className='flex items-center justify-center gap-8'>
            <Button
              type='button'
              variant='primary'
              size='base'
              className='h-[49px] w-[130px]  '
              onClick={handleActivateCandidate}
              isLoading={isLoading}
            >
              <span className=''>Continue</span>
            </Button>
            <Button
              type='button'
              variant='outline'
              size='base'
              className='h-[49px] w-[130px] '
              onClick={handleCloseModal}
            >
              <span className=''>Cancel</span>
            </Button>
          </div>
        </section>
      </ModalWrapper>
    </Modal>
  );
};

export default ActivationAlert;
