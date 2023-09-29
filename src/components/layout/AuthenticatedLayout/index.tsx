import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';

import NavBar from '@/components/shared/navBar/NavBar';
import SideNav from '@/components/shared/sideNav';

import { useAppDispatch } from '@/store/store.hooks';

import { setValue } from '@/slices/searchSlice';
// import { registerAPI } from '@/utils/api';

const AuthenticatedLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const toggleSidebar = () => { setSidebarIsOpen(!sidebarIsOpen) }

  const closeSidebar = () => {
    if (sidebarIsOpen) setSidebarIsOpen(false)
  }
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.asPath) {
      dispatch(setValue({ value: '' })); 
    }
  }, [dispatch, router]);

  const opaqueBg = "max-[768px]:bg-gray-100 max-[768px]:opacity-50 transition-opacity duration-300 ease-in delay-300"

  return (
    <div className='layout_wrapper bg-bg'>
      <SideNav handleClick={toggleSidebar} isOpen={sidebarIsOpen} />
      {/* {!largeScreen && <MobileNav />} */}

      <div className='main_wrapper  '>
      <div id="NavWithContent" onClick={closeSidebar} className={`w-[100%] pt-3 overflow-y-auto ${sidebarIsOpen ? opaqueBg : ''}`}>

        <div className='px-6'>
          <NavBar isOpen={sidebarIsOpen} handleClick={toggleSidebar}/>
        </div>
        <div className='main_container  overflow-hidden'>
          <div className='h-full w-full overflow-hidden'>
            <main className='h-full w-full overflow-hidden'>{children}</main>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
