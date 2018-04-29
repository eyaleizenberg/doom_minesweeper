import * as React from 'react';
import Sound from 'react-sound';

class ThemeMusic extends React.PureComponent<null, {time: number}> {
  constructor(props) {
    super(props);
    this.state = {
      time: Date.now()
    };
    this.handleFinishedPlaying = this.handleFinishedPlaying.bind(this);
  }

  handleFinishedPlaying() {
    this.setState({
      time: Date.now()
    });
  }

  render() {
    return (
      <Sound
        url={`${window.__STATICS_BASE_URL__}/assets/sounds/doom_e1m1.mp3`}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={this.handleFinishedPlaying}
        />
    );
  }
}

export default ThemeMusic;
