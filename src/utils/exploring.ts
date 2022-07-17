export const findInObjArray = (
  array: any[],
  value: any,
  by: string = "name",
  returnFirst: boolean = true
) => {
  // eslint-disable-next-line eqeqeq
  const foundElements = array.filter((element) => element[by] == value);
  if (foundElements) {
    if (returnFirst) {
      return foundElements[0];
    } else {
      return foundElements;
    }
  } else {
    return null;
  }
};
