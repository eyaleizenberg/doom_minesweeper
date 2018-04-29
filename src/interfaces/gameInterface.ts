export interface IGameState {
  isGameOver: boolean;
  gameInProgress: boolean;
  newGameDialogShown: boolean;
  customGameDialogShown: boolean;
  isGameWon: boolean;
  saveDialogShown: boolean;
  loadDialogShown: boolean;
  timer: number;
}

export interface IGame {
  id: string;
  name: string;
  hasBeenSaved: boolean;
  fileJustSaved?: boolean;
}
