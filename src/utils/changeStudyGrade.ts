export const changeStudyGrade = (studyGrade: "mag" | "bak" | "spec" | any) => {
  switch (studyGrade) {
    case "mag":
      return "Магистратура";
    case "bak":
      return "Бакалавриат";
    case "spec":
      return "Специалитет";
    default:
      return studyGrade;
  }
};
