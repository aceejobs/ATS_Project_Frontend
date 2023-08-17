declare module 'styled-components';
declare module 'react-date-range';
declare module 'react-datepicker';
declare module 'react-modal';
declare module 'naija-state-local-government';
declare module 'react-trend' {
  interface Props {
    autoDraw?: boolean;
    autoDrawDuration?: number;
    autoDrawEasing?: string;
    data: number[] | Array<{ value: number }>;
    gradient?: string[];
    height?: number;
    padding?: number;
    radius?: number;
    smooth?: boolean;
    stroke?: string;
    strokeDasharray?: number[];
    strokeDashoffset?: number;
    strokeLinecap?: 'butt' | 'square' | 'round';
    strokeLinejoin?: string;
    strokeOpacity?: number;
    strokeWidth?: number;
    width?: number;
  }
  export default class Trend extends React.Component<Props> {}
}
