import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';

import NavBar from '@/components/shared/navBar/NavBar';
import SideNav from '@/components/shared/sideNav';

import { useAppDispatch } from '@/store/store.hooks';

import { setValue } from '@/slices/searchSlice';
// import { registerAPI } from '@/utils/api';

const AuthenticatedLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.asPath) {
      dispatch(setValue({ value: '' }));
    }
  }, [dispatch, router]);
  return (
    <div className='layout_wrapper bg-bg'>
      <SideNav />
      {/* {!largeScreen && <MobileNav />} */}

      <div className='main_wrapper  '>
        <div className='px-6'>
          <NavBar />
        </div>
        <div className='main_container  overflow-hidden'>
          <div className='h-full w-full overflow-hidden'>
            <main className='h-full w-full overflow-hidden'>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
