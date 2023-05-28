import { Role } from "../types/types";

export const changeRoleLang = (role: Role | any) => {
  switch (role) {
    case "curator":
      return "Куратор";
    case "intern":
      return "Стажер";
    case "mentor":
      return "Наставник";
    case "hr":
      return "Кадры";
    case "admin":
      return "Администратор";
    case "candidat":
      return "Кандидат";
    default:
      return role;
  }
};
