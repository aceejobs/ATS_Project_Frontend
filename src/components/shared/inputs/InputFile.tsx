import React, { useState } from 'react';

import { InputFileProps } from '@/components/shared/inputs/type';

const InputFile: React.FC<InputFileProps<HTMLInputElement>> = ({
  className,
  placeholder,
  type,
  onChange,
  formikErrors,
  formikTouched,
  id,
  name,
  extensions,
}) => {
  const [image, setImage] = useState<File | null | undefined>();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files && Array.from(e.target.files);
    if (files) {
      setImage(files[0]);
    }

    if (!files) {
      return;
    }

    onChange(id, files);
    // return;
  };
  return (
    <div className={`${className} mb-4`}>
      <label htmlFor={id} className='cursor-pointer  '>
        <div className=' flex h-[49px] cursor-pointer items-center rounded-[5px]  border border-ace-grey pr-4  '>
          <p
            style={{
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px',
              borderBottomRightRadius: '5px',
              borderTopRightRadius: '5px',
            }}
            className='flex h-full w-[89px] items-center justify-center border border-l-0 border-r-ace-grey bg-[#f4f4f4] text-[14px] text-ace-black'
          >
            <span>Upload</span>
          </p>
          <p className='mx-auto text-ace-black'>
            {image ? image.name : placeholder}
          </p>
        </div>
        <input
          onChange={handleFileUpload}
          type={type}
          id={id}
          name={name}
          className='hidden '
          accept={`${
            extensions ? extensions : '.doc, .docx, .png. .jpeg, .jpg '
          }`}
        />
      </label>
      {formikTouched && formikErrors && (
        <div className='ml-3 block  text-left text-[10px] font-light    text-red-600'>
          *{formikErrors}
        </div>
      )}
    </div>
  );
};

export default InputFile;
