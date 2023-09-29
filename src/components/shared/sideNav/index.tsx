import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavItem from '@/components/lib/NavItem';
import { FiX } from 'react-icons/fi';

interface iSideBar {
  isOpen: Boolean,
  handleClick: () => void,
}


const SideNav: React.FC<iSideBar> = ({ handleClick, isOpen }) => {
  

  return (
<section onClick={handleClick} id="sideBar" className={`w-[256px] sm:w-[226px]  z-10 lg:sticky bg-white h-screen fixed top-0 left-0 transform delay-0 ${isOpen ? 'translate-x-0' : '-translate-x-[300%] lg:translate-x-0'} transition-transform duration-300 ease-in`}>
      <div className='flex items-center justify-between'>
        <div className="p-4 cursor-pointer">
        <div className='logo'>
          <Link href='/dashboard'>
            
              <Image
                src='/assets/svg/samll-logo-2.svg'
                alt='big-logo'
                width={139}
                height={78}
              />
            
          </Link>
        </div>
        </div>
        <button className='pr-[1.66rem] lg:hidden'>
          <FiX className='text-3xl'/>
          {/* <img src={Close} alt="Close side navigation" /> */}
        </button>
      </div>
      <nav className="text-[14px] font-medium px-6 md:mt-12 ">
      
        <div className='nav-items'>
          <NavItem />
        </div>
      </nav>
      </section>
  );
};

export default SideNav;
