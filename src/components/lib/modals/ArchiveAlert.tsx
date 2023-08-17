import { Icon } from '@iconify/react';
import React from 'react';
import Modal from 'react-modal';

import Button from '@/components/buttons/Button';
import { ModalWrapper } from '@/components/lib/modals/style';
import { IArchiveAlertProps } from '@/components/lib/modals/type';

const ArchiveAlert: React.FC<IArchiveAlertProps> = ({
  isOpen,
  handleCloseModal,
  candidate,
  archiveFn,
  loading,
}) => {
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
              Action Alert
            </p>
            <p className='my-6 text-center text-[16px] font-[400]'>
              You are about to archive {candidate?.first} {candidate.last}!
              Click on continue to proceed.
            </p>
          </div>
          <div className='flex items-center justify-center gap-8'>
            <Button
              type='button'
              variant='primary'
              size='base'
              className='h-[49px] w-[130px]  '
              onClick={() => archiveFn(candidate.id)}
              isLoading={loading}
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

export default ArchiveAlert;
