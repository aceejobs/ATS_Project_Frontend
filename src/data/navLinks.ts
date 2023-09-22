import {
  DASHBOARD,
  HELP,
  JOBS,
  LOGOUT,
  NOTIFICATIONS,
  APPLICATIONS
} from '@/constant/constants';

// import { CANDIDATES } from '../constant/constants';

export const profileDropdown = [
  {
    id: 1,
    icon: 'clarity:help-line',
    name: HELP,
  },
  {
    id: 2,
    icon: 'ri:notification-2-line',
    name: NOTIFICATIONS,
  },
  {
    id: 3,
    icon: 'material-symbols:logout',
    name: LOGOUT,
  },
];

export const sideBarData: {
  id: number;
  name: string;
  icon: string;
  active_icon: string;
  link: string;
  subLinks: {
    id: number;
    subType: string;
    link: string;
    icon: string;
  }[];
}[] = [
  {
    id: 1,
    name: DASHBOARD,
    link: '/dashboard',
    subLinks: [],
    icon: 'ic:round-dashboard',
    active_icon: 'material-symbols:dashboard-rounded',
  },
  {
    id: 2,
    name: APPLICATIONS,
    link: '/applications/active',
    subLinks: [],
    icon: 'fluent:people-community-20-regular',
    active_icon: 'fluent:people-community-20-filled',
  },
  {
    id: 3,
    name: JOBS,
    link: '/jobs',
    subLinks: [],
    icon: 'ph:briefcase-light',
    active_icon: 'ph:briefcase-fill',
  },
];
