import generateUuid from './generateUuid';
import { IGameState } from '../interfaces/gameInterface';
import { ICellsState } from '../interfaces/cellInterface';

interface ISaveGameOpts {
  userId: string;
  id: string;
  name: string;
  state: {
    game: IGameState;
    cells: ICellsState;
  };
}

const getSavedGamesPath = (userId: string) =>
  `doomMinesweeperSavedGames_${userId}`;

export const getOrGenerateUserId = () => {
  if (process.env.NODE_ENV === 'test') {
    return 'testUser';
  }

  const userId = localStorage.getItem('doomMinesweeperUserId');
  if (userId) {
    return userId;
  }

  const newUserId = generateUuid();
  localStorage.setItem('doomMinesweeperUserId', newUserId);
  return newUserId;
};

export const getSavedGames = (userId: string) => {
  const saveGamesPath = getSavedGamesPath(userId);
  return JSON.parse(localStorage.getItem(saveGamesPath) || '{}');
};

export const saveGame = (opts: ISaveGameOpts) => {
  const { userId, ...otherOpts } = opts;
  const saveGamesPath = getSavedGamesPath(userId);
  const games = getSavedGames(userId);
  games[otherOpts.id] = { ...otherOpts, hasBeenSaved: true };
  localStorage.setItem(saveGamesPath, JSON.stringify(games));
  return games[otherOpts.id];
};
