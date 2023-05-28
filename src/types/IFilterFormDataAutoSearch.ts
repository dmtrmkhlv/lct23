export interface IFilterFormDataAutoSearch {
  citizenship: "ru" | "notru";
  minAge: number;
  maxAge: number;
  minCourse: number;
  studyGrade: "mag" | "bak" | "spec";
  hasExperience: boolean;
}
