export const strToSousageCase = (str: string): string => {
  return str.toLowerCase().split(" ").join("-");
};
