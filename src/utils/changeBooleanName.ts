export const changeBooleanName = (role: boolean | any) => {
  switch (role) {
    case true:
      return "Да";
    case false:
      return "Нет";
    default:
      return role;
  }
};
