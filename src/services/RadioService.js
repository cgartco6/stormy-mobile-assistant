import { Audio } from 'expo-av';

let soundObject = null;

export async function playRadio() {
  if (soundObject) await stopRadio();
  const { sound } = await Audio.Sound.createAsync(
    { uri: 'https://stream.bokradio.com/stream' }, // replace with actual Bok Radio stream URL
    { shouldPlay: true, isLooping: true }
  );
  soundObject = sound;
  await sound.playAsync();
}

export async function stopRadio() {
  if (soundObject) {
    await soundObject.stopAsync();
    await soundObject.unloadAsync();
    soundObject = null;
  }
}
