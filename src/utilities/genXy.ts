export const genXy = (x, y) => `${x}-${y}`;

export const genSurrounding = (x, y) => (
  [[x - 1, y], [x + 1, y], [x, y + 1], [x, y - 1], [x + 1, y + 1], [x + 1, y - 1], [x - 1, y + 1], [x - 1, y - 1]].map(pair => (
    genXy(pair[0], pair[1])
  ))
);
