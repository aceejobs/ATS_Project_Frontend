import { Icon } from '@iconify/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { sideBarData } from '@/data/navLinks';

import { useAppDispatch } from '@/store/store.hooks';

import { logout } from '@/slices/userSlice';

const NavItem = () => {
  const [expanded, setExpanded] = useState<number | boolean>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const route = router.asPath;

  const logOut = () => {
    router.push('/login');
    dispatch(logout());
  };

  // const test =

  return (
    <div className='nav-item bg-white pb-20 lg:pb-6 mt-12'>
      {sideBarData.map((item, index) => (
        <div key={index}>
          <div key={index} className='overflow-hidden text-ace-black'>
            <div
              onClick={() => {
                item.link && router.push(item.link);
                if (item.subLinks) {
                  setExpanded(item.id === expanded ? false : item.id);
                }
              }}
              className={
                route.includes(item.link) ||
                (route === '/applications/in-active' && index === 1)
                  ? 'mx-auto mt-6  flex w-full cursor-pointer items-center justify-between rounded-md bg-ace-blue p-2 px-7 text-white ease-in-out'
                  : 'mx-auto  mt-6 flex w-full cursor-pointer items-center text-gray-600 justify-between rounded-md p-2 px-7 ease-in-out hover:bg-ace-light-blue hover:text-white'
              }
            >
              <span className='flex  items-center gap-3  lg:flex-row '>
                <span className='text-lg'>
                  <Icon icon={item.icon} className='' />
                </span>
                <span className='text-[16px]  lg:text-base'>{item.name}</span>
              </span>
            </div>

            {/* {!item.subLinks && item.link && item.link.length ? (
              <ActiveLinkWrapper
                href={`${item.link}`}
                className='mx-auto mt-3 flex items-center justify-between rounded-[5px] py-2 px-7 ease-in-out hover:bg-ace-light-blue hover:bg-opacity-30 hover:text-ace-black'
                activeClassName='bg-ace-blue text-white'
                as={item.link}
              >
                <NavItemContent {...item} />
              </ActiveLinkWrapper>
            ) : (
              <button
                onClick={() => {
                  item.link && router.push(item.link);
                  
                }}
                className='mx-auto  mt-4 flex w-full items-center justify-between rounded-md p-2 px-7 ease-in-out hover:bg-ace-light-blue hover:text-white'
              >
                <span className='flex items-center gap-3   '>
                  <Icon icon={item.icon} className='font-bold' />
                  <span className='text-md '>{item.name}</span>
                </span>
              </button>
            )} */}

            <AnimatePresence>
              {!!item.subLinks.length && item.id === expanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.6, 0.05, -0.01, 0.9],
                  }}
                >
                  <div className='flex flex-col rounded-lg  py-1 '>
                    {item.subLinks.map((subLink, index) => (
                      <Link
                        href={`${subLink.link}`}
                        key={index}
                        className={
                          route === subLink.link
                            ? ' mb-1 flex w-full cursor-pointer items-center justify-between rounded-md bg-ace-light-blue px-7  ease-in-out '
                            : ' mb-1 flex w-full cursor-pointer items-center justify-between rounded-md px-7 ease-in-out hover:bg-ace-light-blue  '
                        }
                      >
                        <div
                          className={`text-4xl ${
                            route === subLink.link
                              ? 'text-ace-black '
                              : 'text-ace-black hover:text-white'
                          }`}
                        >
                          <div className='flex items-center gap-2 px-4 '>
                            <Icon icon={subLink.icon} />
                            <p className='text-[16px] '>{subLink.subType}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}

      <div
        className='mx-auto  mt-[14rem] flex cursor-pointer items-center gap-3 rounded-[5px] py-2 px-7 ease-in-out'
        onClick={logOut}
        // className='flex justify-center items-center gap-3 cursor-pointer mt-60'
      >
        <Image
          src='/assets/svg/sign-out.svg'
          alt='sign out'
          width={20}
          height={20}
        />
        <p>Sign out</p>
      </div>
    </div>
  );
};

export default NavItem;
