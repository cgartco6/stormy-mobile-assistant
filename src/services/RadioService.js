import { Audio } from 'expo-av';

let soundObject = null;

// Station details from official sources
const STATION_INFO = {
  name: "Bok Radio 98.9 FM",
  tagline: "Die Beter Alternatief",
  website: "https://www.bokradio.co.za",
  social: "@bokradio"
};

export async function playRadio() {
  if (soundObject) await stopRadio();
  
  // ⚠️ REPLACE THIS with the actual stream URL (see steps below)
  const STREAM_URL = 'https://example.com/bokradio-98.9fm/stream';
  
  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri: STREAM_URL },
      { shouldPlay: true, isLooping: true }
    );
    soundObject = sound;
    await sound.playAsync();
    console.log(`Now playing: ${STATION_INFO.name} - ${STATION_INFO.tagline}`);
  } catch (error) {
    console.error('Radio error:', error);
    throw new Error('Could not play Bok Radio. The stream URL may have changed.');
  }
}

// ... stopRadio() remains the same
