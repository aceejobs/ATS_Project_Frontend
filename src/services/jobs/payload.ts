export interface IJobs {
  _id: string;
  title: string;
  company: string;
  description: string;
  responsibility: string;
  requirement: string;
  qualification: string;
  experience: number;
  salary: number;
  jobType: string;
  location: string;
  isAvailable: boolean;
  hiringManager: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

export interface IJobsData {
  job: IJobs;
  candidates: [];
  totalCandidates?: number;
}

export interface CreateJobPayload {
  title: string;
  company: string;
  description: string;
  responsibility: string;
  requirement: string;
  qualification: string;
  experience: number;
  salary: number;
  jobType: string;
  location: string;
}

export interface JobStatus {
  status: boolean;
}
