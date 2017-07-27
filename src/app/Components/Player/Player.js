import React, { Component } from 'react';
import videojs from 'video.js';

class Player extends Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(
      this.videoNode, this.props, function onPlayerReady() {
      // console.log('onPlayerReady', this);
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
      }}>
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js"></video>
      </div>
      </div>
    );
  }
}

const videoJsOptions = {
  width: 800,
  height: 460,
  autoplay: true,
  controls: true,
  sources: [{
    src: 'http://techslides.com/demos/sample-videos/small.webm',
    type: 'video/webm',
  },],
};

export default () => {
  return <Player { ...videoJsOptions } />;
};

// return <VideoPlayer { ...videoJsOptions } />
