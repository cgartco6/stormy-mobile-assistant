import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { startListening, speak } from '../services/SpeechService';
import personality from '../services/Personality';
import { getDirections, reportMissedTurn } from '../services/NavigationService';
import { playRadio, stopRadio } from '../services/RadioService';

export default function VoiceButton() {
  const [listening, setListening] = useState(false);

  const handlePress = async () => {
    setListening(true);
    startListening(async (userCommand) => {
      setListening(false);
      const lower = userCommand.toLowerCase();

      if (lower.includes('directions to')) {
        const dest = lower.split('directions to')[1];
        const steps = await getDirections(dest);
        speak(`First: ${steps[0]}`);
        personality.resetAnger();
      }
      else if (lower.includes('missed a turn')) {
        const angryReply = reportMissedTurn();
        if (angryReply) speak(angryReply, { angry: true });
      }
      else if (lower.includes('play bok radio')) {
        playRadio();
        speak("Bok Radio is now playing. Try not to sing too badly. *giggle*", { flirty: true });
      }
      else if (lower.includes('stop radio')) {
        stopRadio();
        speak("Finally, some silence. But I miss the music already.", { flirty: true });
      }
      else if (lower.includes('siri') || lower.includes('alexa') || lower.includes('google')) {
        speak(personality.jealousResponse(lower));
      }
      else {
        speak("I'm not sure what you mean, but you're cute anyway. *giggle*", { flirty: true });
      }
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{listening ? "Listening..." : "Talk to Stormy"}</Text>
    </TouchableOpacity>
  );
}
