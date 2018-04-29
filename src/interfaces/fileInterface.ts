export interface IFilesState {
  id: string;
  name: string;
  hasBeenSaved: boolean;
  fileJustSaved: string;
  savedFiles: { [key: string]: IFile };
}

export interface IFile {
  id: string;
  name: string;
  hasBeenSaved?: boolean;
  state: {
    game: any;
    cells: any;
  };
}
