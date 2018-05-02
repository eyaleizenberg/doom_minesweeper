The Doom (stylized as DOOM) franchise is a series of first-person shooter video games developed by id Software. The series focuses on the exploits of an unnamed space marine operating under the auspices of Union Aerospace Corporation (UAC), who fights hordes of demons and the undead in order to survive.

The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field.

This game is a hybrid of both of these games. The gameplay of Minesweeper and the theme of DOOM.

The game is built using React, Redux and Typescript.

Here is the code which 'conjures' the 'demons' (mines) on the game matrix. It will loop until all demons have been set in the game:

```javascript
const conjureDemons = (data: ICellMap, totalDemons: number, width: number, height: number): ICellMap => {
  let demonsConjured = 0;
  const tempData = {...data};

  while (demonsConjured < totalDemons) {
    const x = getRandomNumber(width);
    const y = getRandomNumber(height);
    const id = genXy(x, y);

    if (!tempData[id].isDemon) {
      tempData[id] = {...data[id], isDemon: true, demonId: getRandomNumber(MAX_KNOWN_DEMON_TYPES)};
      demonsConjured++;
    }
  }

  return tempData;
};
```

Here is another piece of code from the Cells Reducer. It's a recurisve function which is initiated from exposing an empty cell and looking for other adjacent empty cells.

```javascript
const traverseFromEmpty = (data: ICellMap, initialCell: ICell): void => {
  const adjacentCoordinates = genSurrounding(initialCell.x, initialCell.y);
  adjacentCoordinates.forEach(coordinate => {
    const cell = data[coordinate];
    if (cell && !cell.isExposed && !cell.isDemon && !cell.isFlagged) {
      data[coordinate].isExposed = true;
      if (!cell.adjacentDemons) {
        traverseFromEmpty(data, data[coordinate]);
      }
    }
  });
};
```
