import { connect } from 'react-redux';
import SaveDialog from '../components/Dialogs/saveDialog';
import { getSavedGames, getFileJustSaved } from '../redux/reducers/files';
import { saveFile } from '../redux/actions/files';
import { toggleSaveDialog } from '../redux/actions/game';
import { IFilesState } from '../interfaces/fileInterface';

const mapStateToProps = ({ files }: { files: IFilesState }) => {
  return {
    savedFiles: getSavedGames(files),
    fileJustSaved: getFileJustSaved(files)
  };
};

export default connect(mapStateToProps, { saveFile, toggleSaveDialog })(
  SaveDialog
);
