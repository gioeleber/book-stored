export const strToSousageCase = (str: string): string => {
  return str.toLowerCase().split(" ").join("-");
};

export const strToSlug = (str: string): string => {
  return strToSousageCase(str).replace(/[^a-z0-9-]/gi, "");
};
