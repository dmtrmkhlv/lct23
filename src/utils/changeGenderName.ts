export const changeGenderName = (gender: any) => {
  switch (gender) {
    case "man":
      return "Мужской";
    case "woman":
      return "Женский";
    default:
      return gender;
  }
};
