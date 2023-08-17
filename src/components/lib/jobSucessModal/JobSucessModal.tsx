import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Modal from 'react-modal';

import Button from '@/components/buttons/Button';
import { ModalWrapper } from '@/components/lib/modals/style';
import { GenModalProps } from '@/components/lib/modals/type';

const JobSuccessModal: React.FC<GenModalProps> = ({
  handleCloseModal,
  isOpen,
  title,
  id,
  company,
}) => {
  const router = useRouter();

  const moveToNext = () => {
    router.push(`/jobs/qualified-candidates/${id}`);
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
      className='h-max w-[90%] flex-shrink-0 rounded-[20px]  bg-white drop-shadow-2xl md:h-max lg:w-[570px]'
    >
      <ModalWrapper className='w-full py-[36px] px-[36px]'>
        <section>
          <div>
            <Icon
              icon='material-symbols:close'
              className='ml-auto cursor-pointer text-xl'
              onClick={handleCloseModal}
            />
            <div className='flex items-center justify-center gap-2'>
              <p className='mt-6 text-center text-[20px] font-[600]'>
                {title} Job Successfully Created!
              </p>
              <Image
                src='/assets/svg/check-mark.svg'
                className='mt-4'
                alt='check mark'
                width={50}
                height={23}
              />
            </div>
            <p className='my-6 text-center text-[16px] font-[400]'>
              You have successfully uploaded the {title} job for {company} and
              you can now check out the candidates that are qualified for the
              role.
            </p>
          </div>
          <div className='flex items-center justify-center gap-10'>
            <Button
              type='button'
              variant='primary'
              size='base'
              className='h-[60px] w-[248px]  '
              onClick={moveToNext}

              // isLoading={loading}
            >
              <span className=''>Search Qualified Candidates</span>
            </Button>
            <Button
              type='button'
              variant='outline'
              size='base'
              className='h-[60px] w-[116px]  '
              onClick={() => router.push(`/jobs/view-job/${id}`)}

              // isLoading={loading}
            >
              <span className=''>View Job</span>
            </Button>
          </div>
        </section>
      </ModalWrapper>
    </Modal>
  );
};

export default JobSuccessModal;
