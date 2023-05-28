export const changeStudyGradeNames = (name: string) => {
  switch (name) {
    case "SOO":
      return "Среднее (полное) общее образование";
    case "NPO":
      return "Начальное профессиональное образование";
    case "SPO":
      return "Среднее профессиональное образование";
    case "NVO":
      return "Неполное высшее образование";
    case "VO":
      return "Высшее образование";
    default:
      return name;
  }
};
