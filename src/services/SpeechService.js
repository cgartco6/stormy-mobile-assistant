import * as Speech from 'expo-speech';
import Voice from 'expo-voice';

let isListening = false;

export async function startListening(onResult) {
  if (isListening) return;
  isListening = true;
  try {
    const result = await Voice.startListening({ language: 'en-US' });
    Voice.onSpeechResults = (e) => {
      onResult(e.value[0]);
      stopListening();
    };
  } catch (error) {
    console.error(error);
    stopListening();
  }
}

export function stopListening() {
  isListening = false;
  Voice.stopListening();
}

export function speak(text, options = {}) {
  Speech.speak(text, {
    language: 'en',
    pitch: options.flirty ? 1.1 : 1.0,
    rate: options.angry ? 0.9 : 1.0,
    ...options
  });
}
