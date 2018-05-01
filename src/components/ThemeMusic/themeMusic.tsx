import * as React from 'react';
import Sound from 'react-sound';
const doome1m1 = require('../../assets/sounds/doom_e1m1.mp3');

class ThemeMusic extends React.PureComponent<any, { time: number }> {
  constructor(props: any) {
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
        url={doome1m1}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={this.handleFinishedPlaying}
      />
    );
  }
}

export default ThemeMusic;
