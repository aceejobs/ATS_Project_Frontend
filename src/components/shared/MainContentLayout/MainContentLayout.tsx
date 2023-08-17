import { MainContentLayoutProps } from './types';

const MainContentLayout: React.FC<MainContentLayoutProps> = (props) => {
  const { children, className, overwriteStyles, ...rest } = props;

  return (
    <>
      <div
        {...rest}
        className={`${
          overwriteStyles && className
            ? className
            : className
            ? `mt-6 h-full w-full overflow-y-auto px-6 pb-12  ${className}`
            : 'mt-6 h-full w-full overflow-y-auto px-6 pb-12 '
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default MainContentLayout;
