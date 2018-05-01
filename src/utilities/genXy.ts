export const genXy = (x: number, y: number) => `${x}-${y}`;

export const genSurrounding = (x: number, y: number) =>
  [
    [x - 1, y],
    [x + 1, y],
    [x, y + 1],
    [x, y - 1],
    [x + 1, y + 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x - 1, y - 1]
  ].map(pair => genXy(pair[0], pair[1]));
