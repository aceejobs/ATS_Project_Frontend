import Image from 'next/image';

import { InputEvent } from '@/utils/types';

type ProfileImageFieldProps = {
  value?: File | string;
  onChange: (file: File | null) => void;
};

const ProfileImageField = ({ value, onChange }: ProfileImageFieldProps) => {
  const onImageSelect = (e: InputEvent) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    onChange(null);
  };
  const preview =
    typeof value === 'string' ? value : value && URL.createObjectURL(value);
  return (
    <div className='mb-4 flex w-[42%] items-center justify-between'>
      <>
        {preview ? (
          <div className='relative h-[250px] w-[250px] '>
            <Image
              className='rounded-full'
              alt='Thumb'
              src={preview}
              style={{ objectFit: 'cover' }}
              fill={true}
            />
          </div>
        ) : (
          <Image
            src='/assets/svg/avatar.svg'
            alt='empty'
            width={250}
            height={250}
          />
        )}
      </>
      <div className='flex flex-col'>
        <label htmlFor='inputTag' className='cursor-pointer '>
          <div className='mt-3 flex h-[52px] w-[132px] cursor-pointer items-center justify-center rounded-[5px] border-ace-blue bg-ace-blue text-white hover:bg-ace-blue'>
            <p>Upload New</p>
          </div>
          <input
            onChange={onImageSelect}
            type='file'
            id='inputTag'
            className='hidden pt-3'
            accept='image/png, image/jpg, image/gif, image/jpeg'
          />
        </label>
        <div
          onClick={removeSelectedImage}
          className='mt-3 flex h-[52px] w-[132px] cursor-pointer items-center justify-center rounded-[5px] border-[#ED1B24] bg-[#ED1B24] text-white hover:bg-[#ED1B24]'
        >
          <p>Delete </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageField;
