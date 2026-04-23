import textToSpeech from '@google-cloud/text-to-speech';
import { Audio } from 'expo-av';

// Load credentials from file (place stormy-credentials.json in project root)
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: './stormy-credentials.json'
});

export async function speakSexy(text, options = {}) {
  const request = {
    input: { text },
    voice: {
      languageCode: 'en-US',
      name: 'en-US-Neural2-F', // female, warm, natural
      ssmlGender: 'FEMALE'
    },
    audioConfig: {
      audioEncoding: 'MP3',
      pitch: options.flirty ? 3.0 : (options.angry ? -1.0 : 1.0),
      speakingRate: options.angry ? 1.1 : 1.0,
      volumeGainDb: 0
    }
  };
  const [response] = await client.synthesizeSpeech(request);
  const soundObject = new Audio.Sound();
  await soundObject.loadAsync({ uri: `data:audio/mp3;base64,${response.audioContent.toString('base64')}` });
  await soundObject.playAsync();
}
