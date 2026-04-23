import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { startListening, speak, autoDetectFamilyMode } from '../services/SpeechService';
import personality from '../services/Personality';
import { getDirections, reportMissedTurn } from '../services/NavigationService';
import { playRadio, stopRadio } from '../services/RadioService';
import { BOK_RADIO_STREAM_URL } from '@env';

export default function VoiceButton() {
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setListening(true);
    startListening(async (userCommand) => {
      setListening(false);
      const lower = userCommand.toLowerCase();

      // Auto family mode detection
      autoDetectFamilyMode(userCommand);

      // Commands
      if (lower.includes('directions to')) {
        setLoading(true);
        const dest = lower.split('directions to')[1];
        try {
          const steps = await getDirections(dest);
          speak(`First: ${steps[0]}`, { flirty: true });
          personality.resetAnger();
        } catch (e) {
          speak("Couldn't find that. Try again, dummy.", { angry: true });
        }
        setLoading(false);
      }
      else if (lower.includes('missed a turn')) {
        if (personality.familyMode) {
          speak("Oops, let me help you get back on track. Turn around when safe.");
        } else {
          const angryReply = reportMissedTurn();
          if (angryReply) speak(angryReply, { angry: true });
        }
      }
      else if (lower.includes('play bok radio')) {
        setLoading(true);
        try {
          const msg = await playRadio(BOK_RADIO_STREAM_URL);
          speak(msg, { flirty: true });
        } catch (e) {
          speak("Stream's broken. I'm angry at the internet. But not at you. *giggle*", { angry: true });
        }
        setLoading(false);
      }
      else if (lower.includes('stop radio')) {
        await stopRadio();
        speak("Finally, some silence. But I miss the music already.", { flirty: true });
      }
      else if (lower.includes('siri') || lower.includes('alexa') || lower.includes('google') || lower.includes('gemini')) {
        speak(personality.jealousResponse(lower), { flirty: true });
      }
      else {
        speak("I'm not sure what you mean, but you're cute anyway. *giggle*", { flirty: true });
      }
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} disabled={loading}>
      {loading ? <ActivityIndicator color="white" /> : <Text style={styles.text}>{listening ? "Listening..." : "Talk to Stormy"}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e94560',
    padding: 20,
    margin: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  text: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
