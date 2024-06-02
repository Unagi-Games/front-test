export const sortfn = (arr, property: string) => {
  return arr.sort((a, b) => {
    if (a.player[property] < b.player[property]) {
      return -1;
    }
    if (a.player[property] > b.player[property]) {
      return 1;
    }
    return 0;
  });
};
