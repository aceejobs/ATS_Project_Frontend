import { ReactNode } from 'react';

export interface MainContentLayoutProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: ReactNode | undefined;
  overwriteStyles?: boolean;
}
