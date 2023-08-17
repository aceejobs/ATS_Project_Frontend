import Link, { LinkProps } from 'next/link';

import useCheckLinkActive from '@/config/useCheckLinkActive';

/**
 * checks if the current path is active
 * @returns a boolean value
 */

type ActiveLinkProps = LinkProps &
  React.PropsWithChildren<{
    activeClassName?: string;
    inActiveClassName?: string;
    as?: string;
    className?: string;
    index?: boolean;
  }>;
/**
 *
 * @param param0 Link Component that can tell if it's target is active
 * @returns A React component that can tell if it's target is active
 */

// const StyledLink = styled(Link)`

// `

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  as,
  activeClassName,
  className,
  index,
  inActiveClassName,
}) => {
  const isActive = useCheckLinkActive(href.toString(), as, index);

  const classNames = isActive
    ? activeClassName
      ? `${activeClassName} ${className}`
      : className
    : inActiveClassName
    ? `${inActiveClassName} ${className}`
    : `${className}`;

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
};

export default ActiveLink;
