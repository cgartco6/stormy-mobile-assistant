import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';

const HiddenVideoPlayer = ({ streamUrl, playing, onError }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (playing && videoRef.current) {
      videoRef.current.seek(0);
    }
  }, [playing]);

  return (
    <View style={{ position: 'absolute', width: 1, height: 1, opacity: 0.01 }}>
      <Video
        ref={videoRef}
        source={{ uri: streamUrl, type: 'm3u8' }}
        paused={!playing}
        repeat={true}
        audioOnly={true}
        playInBackground={true}
        playWhenInactive={true}
        ignoreSilentSwitch="ignore"
        onError={onError}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
      />
    </View>
  );
};

export default HiddenVideoPlayer;
