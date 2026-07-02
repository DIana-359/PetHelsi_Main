export interface IOrganization {
  name?: string;
  city?: string;
}

export interface IDiploma {
  diplomaId: number;
  url?: string;
}

export interface IEducation {
  id: number;
  institution?: string;
  startYear?: string;
  endYear?: string;
  diplomas?: IDiploma[];
}

export interface IAdditional {
  id: number;
  courseName?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  certificateUrl?: string;
}

export interface IDoctorProfile {
  id: number;
  surname: string;
  name: string;
  patronymic?: string;
  rating?: number;
  experience?: number;
  rate?: number;
  description?: string;
  avatar?: string;
  userId: number;
  userEmail: string;
  organization?: IOrganization;
  issueTypes?: string[];
  petTypes?: string[];
  educations?: IEducation[];
  additionals?: IAdditional[];
}
