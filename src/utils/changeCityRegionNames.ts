export const changeCityRegionNames = (name: string) => {
  switch (name) {
    case "CAO":
      return "ЦАО";
    case "SAO":
      return "САО";
    case "SVAO":
      return "СВАО";
    case "UVAO":
      return "ЮВАО";
    case "UAO":
      return "ЮАО";
    case "UZAO":
      return "ЮЗАО";
    case "ZAO":
      return "ЗАО";
    case "SZAO":
      return "СЗАО";
    case "ZelAO":
      return "ЗелАО";
    case "TiNAO":
      return "ТиНАО";
    default:
      return name;
  }
};
