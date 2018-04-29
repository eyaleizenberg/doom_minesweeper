import generateUuid from './generateUuid';

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
