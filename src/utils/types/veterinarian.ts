export interface Veterinarian {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  experience: number;
  reviews_count: number;
  rating: number;
  organization: {
    name: string,
    city: string
  },
  // petCategories: string[];
  // petProblems: string[];

  petTypes: string[];
  issueTypes: string[]

  education: {
    eduInstitution: string;
    startDateStudy: string;
    finishDateStudy: string;
    diplomaUrl: string[];
  };
  additionalEducation: {
    learningCenter: string;
    startDateLearning: string;
    finishDateLearning: string;
    certificateUrl: string[];
  }[];
  reviews: {
    fullName: string;
    dateReviews: string;
    rating: string;
    comment: string;
  }[];
  description: string;
  photo_url: string;
}
