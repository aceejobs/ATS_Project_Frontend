import Image from 'next/image';
import Link from 'next/link';

import NavItem from '@/components/lib/NavItem';

const SideNav = () => {
  return (
    <div className='layout__side_bar__wrapper '>
      <aside className='layout__side_bar'>
        <div className='my-auto flex h-20 w-full items-center bg-white px-4 py-4'>
          <Link
            href='/dashboard'
            className='relative flex h-full w-full items-center'
          >
            <div className='relative mt-8 h-[78px] w-[139px]'>
              <Image
                src='/assets/svg/samll-logo-2.svg'
                alt='big-logo'
                className='object-contain'
                fill={true}
              />
            </div>
          </Link>
        </div>
        <div className='w-full px-4 pt-6 '>
          <NavItem />
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
