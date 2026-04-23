import textToSpeech from '@google-cloud/text-to-speech';
import { Audio } from 'expo-av';
import 'react-native-get-random-values';

// Initialize client (you'll need to download service account JSON from Google Cloud)
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: './stormy-credentials.json' // see setup below
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
      pitch: options.flirty ? 3.0 : 1.0,   // higher = more spunky
      speakingRate: options.angry ? 1.1 : 1.0,
      volumeGainDb: 0
    }
  };
  const [response] = await client.synthesizeSpeech(request);
  const soundObject = new Audio.Sound();
  await soundObject.loadAsync({ uri: `data:audio/mp3;base64,${response.audioContent.toString('base64')}` });
  await soundObject.playAsync();
}
