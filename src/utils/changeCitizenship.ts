export const changeCitizenship = (role: "ru" | "notru") => {
  switch (role) {
    case "ru":
      return "РФ";
    case "notru":
      return "Не РФ";
  }
};
