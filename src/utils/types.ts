export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<EventTarget>;

export type ICandidateFilter = {
  startDate?: Date;
  stopDate?: Date;
};

export interface APIResponse<Data> {
  status: string;
  message: string;
  token?: string | undefined;
  data: Data;
}
export interface IJob {
  id: number;
  jobName: string;
  recruiter: string;
  noOfQualified: number;
  location: string;
  role: string;
  salary: string;
  active: boolean;
}

export interface ICandidate {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  profession: string;
  street: string;
  state: string;
  city: string;
  country: string;
  jobStatus: string;
  experience: number;
  verificationStatus: string;
  profileStatus: string;
  profileMode: string;
  salary: number;
  profileImage: string;
  gender?: string;
  resume: string;
  identification: string;
  qualification: string;
  nextOfKinFirstName: string;
  nextOfKinLastName: string;
  nextOfKinStreet: string;
  nextOfKinState: string;
  nextOfKinPhone: string;
  nextOfKinCity: string;
  nextOfKinCountry: string;
  staffId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  isActive: boolean;
  isArchive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IJobStatus {
  jobStatus: string;
}
