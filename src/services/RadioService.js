import { Audio } from 'expo-av';

let soundObject = null;

export async function setupAudioMode() {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
}

export async function playRadio(streamUrl) {
  if (soundObject) await stopRadio();
  await setupAudioMode();

  try {
    const { sound } = await Audio.Sound.createAsync(
      { uri: streamUrl },
      { shouldPlay: true, isLooping: true, progressUpdateIntervalMillis: 1000 },
      (status) => {
        if (status.isLoaded && status.error) {
          console.error('HLS error:', status.error);
        }
      }
    );
    soundObject = sound;
    await sound.playAsync();
    return `Bok Radio 98.9 FM – Die Beter Alternatief – is now playing. Try not to sing too badly. *giggle*`;
  } catch (error) {
    console.error('Radio error:', error);
    throw new Error('Stream unavailable');
  }
}

export async function stopRadio() {
  if (soundObject) {
    await soundObject.stopAsync();
    await soundObject.unloadAsync();
    soundObject = null;
  }
}
