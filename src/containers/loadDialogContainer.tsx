import { connect } from 'react-redux';
import LoadDialog from '../components/Dialogs/loadDialog';
import { getSavedGames } from '../redux/reducers/files';
import { loadFile } from '../redux/actions/files';
import { toggleLoadDialog } from '../redux/actions/game';
import { IFilesState } from '../interfaces/fileInterface';

const mapStateToProps = ({ files }: { files: IFilesState }) => {
  return {
    savedFiles: getSavedGames(files)
  };
};

export default connect(mapStateToProps, { toggleLoadDialog, loadFile })(
  LoadDialog
);
