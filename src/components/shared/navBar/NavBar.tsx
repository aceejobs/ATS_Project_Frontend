import Image from 'next/image';
import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import Search from '@/components/lib/search/Search';

import { useAppSelector } from '../../../store/store.hooks';
import InitialsAvatar from "react-initials-avatar";
import { FaBars } from 'react-icons/fa';
interface iNav {
  handleClick: () => void,
  isOpen: boolean
}
const NavBar:  React.FC<iNav> = ({ handleClick, isOpen })  => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showTip, setShowTip] = useState(false);
  const tipRef = useRef<null | HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.user);

  console.log("user", user)
  const fullName =  `${user?.firstName} ${user?.lastName}`
  useOnClickOutside(tipRef, () => setShowTip(false));

  return (
    <nav className='layout__top_nav  mt-4 flex items-center rounded-[5px] '>
    <div className='flex w-full items-center justify-between px-4 '>
      <button
        onClick={handleClick}
        className='flex items-center w-[2rem] h-[2rem] mr-2 justify-center rounded-[50%] lg:hidden'
      >
        <FaBars /> {/* Use the React Icons component for the toggle bar */}
      </button>

      <div className='w-full lg:w-auto flex items-center'>
        <Search className='w-[10rem] lg:w-auto' />
      </div>

      <div className='relative cursor-pointer py-2'>
        <div className='flex items-center gap-2 text-xs'>
          <div className='border border-white bg-gray-800 w-[3rem] h-[3rem] flex justify-center items-center rounded-full'>
            <InitialsAvatar
              className='text-[20px] text-white font-bold'
              name={user ? fullName : ''}
            />
          </div>
            <div
              onClick={() => {
                setShowTip(true);
              }}
              className='md:mr-20'
            >
              <p className='text-[14px] font-bold'>
                {user?.firstName} {user?.lastName}
              </p>
              <p className='hidden md:block'>Admin</p>
            </div>
            <div className='hidden md:block'>
            <Image
              alt='owner'
              src='/assets/svg/bell.svg'
              width={40}
              height={40}
              className=''
            />
            </div>
            
          </div>
          {showTip && (
            <div
              ref={tipRef}
              className='absolute  top-20 z-[999]  h-[251px] w-[232px] rounded-[5px] bg-white  p-4 text-[12px] text-ace-black shadow'
            >
              <div>
                <p className='text-center text-[14px] font-bold'>
                  Admin Profile
                </p>
                <div className='relative mx-auto mt-3 block h-[62px] w-[62px] rounded-full'>
                  <Image
                    alt='owner'
                    // src='https://res.cloudinary.com/emmabraboke/image/upload/v1680001036/o9x7rkbrpjqqerh5agnt.png'
                    src={user?.profileImage}
                    fill={true}
                    className='rounded-full object-contain'
                  />
                </div>
                <div className='mt-3 px-6'>
                  <div className='flex items-center justify-between '>
                    <p>
                      {user?.firstName} {user?.lastName}
                    </p>
                    {/* <Icon
                      icon='material-symbols:edit'
                      className='h-[14px] w-[14px] text-ace-blue'
                    /> */}
                  </div>
                  <hr className='mt-1' />

                  <div className='mt-2 flex items-center justify-between'>
                    <p>Admin</p>
                    {/* <Icon
                      icon='material-symbols:edit'
                      className='h-[14px] w-[14px] text-ace-blue'
                    /> */}
                  </div>
                  <hr className='mt-1' />

                  <div className='mt-2 flex items-center justify-between'>
                    <p>Change Password</p>
                    {/* <Icon
                      icon='material-symbols:edit'
                      className='h-[14px] w-[14px] text-ace-blue'
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
