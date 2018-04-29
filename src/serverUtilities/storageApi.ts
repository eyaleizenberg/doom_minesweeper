import * as storage from 'node-persist';
storage.init();

export const getGamesForUserId = async(userId: string) => new Promise((resolve) => {
  storage.getItem(userId).then(games => {
    resolve(games || []);
  });
});

export const setGameForUserId = async(opts: {userId: string, id: string, name: string, state: {}}) => new Promise((resolve, reject) => {
  const {userId, id, name, state} = opts;
  storage.getItem(userId).then(games => {
    if (!games) {
      return [];
    }
    return games;
  }).then(games => {
    let fileIndex = games.findIndex(file => { return file.id === id; });
    fileIndex = fileIndex === -1 ? games.length :  fileIndex;
    const newGames = [...games];
    newGames[fileIndex] = {id, name, state, hasBeenSaved: true};
    storage.setItem(userId, newGames).then(
      (data) => {
        resolve(newGames[fileIndex]);
      },
      (error) => {
        reject(error);
      }
    );
  });
});

export const clearItemSync = (userId: string): void => {
  storage.removeItemSync(userId);
};
