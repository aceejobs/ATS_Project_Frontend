import { Icon } from '@iconify/react';

import { NavItemContentProps } from '@/components/lib/NavItemContent/types';

import useCheckLinkActive from '@/config/useCheckLinkActive';

const NavItemContent: NavItemContentProps = ({
  link,
  active_icon,
  icon,
  name,
}) => {
  const isActive = useCheckLinkActive(link, link);
  return (
    <span className='flex flex-col items-center gap-3  lg:flex-row '>
      <span className='text-lg'>
        <Icon icon={isActive ? active_icon : icon} className='' />
      </span>
      <span className='text-[16px]  lg:text-base'>{name}</span>
    </span>
  );
};

export default NavItemContent;
