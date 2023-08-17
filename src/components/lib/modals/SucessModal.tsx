import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from 'react-modal';
import { useMutation } from 'react-query';

import Button from '@/components/buttons/Button';
import { ModalWrapper } from '@/components/lib/modals/style';
import { GenModalProps } from '@/components/lib/modals/type';

import { sendPaymentLink } from '@/services/candidate';

const SucessModal: React.FC<GenModalProps & { candidateId?: string }> = ({
  candidateId,
  handleCloseModal,
  isOpen,
}) => {
  const [sendLink, setSendLink] = useState(false);
  const router = useRouter();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: sendPaymentLink,
    onSuccess: () => {
      setSendLink((prev) => !prev);
      toast.success('Payment link sent  to the candidate Successfully');
    },
  });

  const handlePaymentLink = () => {
    candidateId && mutate(candidateId);
  };

  useEffect(() => {
    if (isSuccess && sendLink) {
      router.push('/candidates/in-active');
    }
  }, [isSuccess, router, sendLink]);
  const SendActivationLink = () => {
    return (
      <div>
        <Icon
          icon='material-symbols:close'
          className='ml-auto cursor-pointer text-xl'
          onClick={handleCloseModal}
        />
        <Image
          src='/assets/svg/airplane.svg'
          alt='airplane'
          width={140}
          height={129}
          className='mx-auto block'
        />
        <p className='mt-6 text-center text-[20px] font-[600]'>
          Activation Details Sent Successfully!
        </p>
      </div>
    );
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
        {sendLink ? (
          <SendActivationLink />
        ) : (
          <section>
            <div>
              <Icon
                icon='material-symbols:close'
                className='ml-auto cursor-pointer text-xl'
                onClick={handleCloseModal}
              />
              <p className='mt-6 text-center text-[20px] font-[600]'>
                Profile Created Successfully!
              </p>
              <p className='my-6 text-center text-[16px] font-[400]'>
                To activate new profile, click the link below to send activation
                details to the candidate for payment
              </p>
            </div>
            <div className='flex items-center justify-center'>
              <Button
                type='button'
                variant='primary'
                size='base'
                className='h-[60px] w-[240px] bg-[#0422EF] '
                onClick={handlePaymentLink}
                disabled={!candidateId}
                isLoading={isLoading}
              >
                <span className=''>Send Activation Details</span>
              </Button>
            </div>
          </section>
        )}
      </ModalWrapper>
    </Modal>
  );
};

export default SucessModal;
