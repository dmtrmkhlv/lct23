export const objCompare = (objInit: any, obj: any): boolean => {
  return JSON.stringify(objInit) === JSON.stringify(obj);
};
