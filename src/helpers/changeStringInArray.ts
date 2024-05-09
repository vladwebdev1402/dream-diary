const changeStringInArray = (arr: string[], str: string) => {
  if (arr.find((item) => str === item) !== undefined) {
    return arr.filter((item) => item !== str);
  }
  return [...arr, str];
};

export { changeStringInArray };
