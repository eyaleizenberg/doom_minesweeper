export const root = '/';
export const baseGamesRoute = '/api/games';
export const gamesRoute = `${baseGamesRoute}/:userId`;
export const getGamesRoute = (userId: string) => `${baseGamesRoute}/${userId}`;
