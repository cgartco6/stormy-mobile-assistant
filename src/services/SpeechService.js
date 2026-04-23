import * as Speech from 'expo-speech';
import Voice from 'expo-voice';
import personality from './Personality';
import { speakSexy } from './SexyVoice';

let isListening = false;
const USE_SEXY_VOICE = true;

export async function speak(text, options = {}) {
  if (USE_SEXY_VOICE) {
    await speakSexy(text, options);
  } else {
    Speech.speak(text, {
      language: 'en',
      pitch: options.flirty ? 1.2 : (options.angry ? 0.9 : 1.0),
      rate: 0.95,
    });
  }
  console.log(`Stormy said: ${text}`);
}

export async function startListening(onResult) {
  if (isListening) return;
  isListening = true;
  try {
    await Voice.startListening({ language: 'en-US' });
    Voice.onSpeechResults = (e) => {
      const transcript = e.value[0];
      onResult(transcript);
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

export function autoDetectFamilyMode(transcript) {
  const lower = transcript.toLowerCase();
  const kidKeywords = ['kid', 'child', 'children', 'daughter', 'son', 'baby', 'family mode', 'kids are here'];
  if (kidKeywords.some(kw => lower.includes(kw)) && !personality.familyMode) {
    personality.enableFamilyMode();
    speak("Family mode activated. I'll behave... mostly. *giggle*", { flirty: true });
    return true;
  }
  return false;
}
