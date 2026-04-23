import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { startListening, speak, autoDetectFamilyMode } from '../services/SpeechService';
import personality from '../services/Personality';
import { getDirections, reportMissedTurn, getCurrentLocation } from '../services/NavigationService';
import { playRadio, stopRadio } from '../services/RadioService';
import { webSearch } from '../services/WebSearchService';
import { getWeather } from '../services/WeatherService';
import { getNews } from '../services/NewsService';
import { BOK_RADIO_STREAM_URL } from '@env';

export default function VoiceButton() {
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setListening(true);
    startListening(async (userCommand) => {
      setListening(false);
      const lower = userCommand.toLowerCase().trim();

      autoDetectFamilyMode(userCommand);

      // Navigation
      if (lower.includes('directions to')) {
        setLoading(true);
        const dest = lower.split('directions to')[1]?.trim();
        if (!dest) {
          speak("Where to, smarty?");
        } else {
          try {
            const steps = await getDirections(dest);
            speak(`First: ${steps[0]}`, { flirty: true });
            personality.resetAnger();
          } catch (e) {
            speak("Couldn't find that. Try again, dummy.", { angry: true });
          }
        }
        setLoading(false);
      }
      // Missed turn
      else if (lower.includes('missed a turn') || lower.includes('i missed the turn')) {
        if (personality.familyMode) {
          speak("Oops, let me help you get back on track. Turn around when safe.");
        } else {
          const angryReply = reportMissedTurn();
          if (angryReply) speak(angryReply, { angry: true });
          else speak("Just recalculating. No big deal.", { flirty: true });
        }
      }
      // Radio
      else if (lower.includes('play bok radio') || lower.includes('play bok') || lower.includes('bok radio')) {
        setLoading(true);
        try {
          const msg = await playRadio(BOK_RADIO_STREAM_URL);
          speak(msg, { flirty: true });
        } catch (e) {
          speak("Stream's broken. I'm angry at the internet. But not at you. *giggle*", { angry: true });
        }
        setLoading(false);
      }
      else if (lower.includes('stop radio') || lower.includes('turn off radio')) {
        await stopRadio();
        speak("Finally, some silence. But I miss the music already.", { flirty: true });
      }
      // Web search
      else if (lower.startsWith('search for') || lower.startsWith('search ')) {
        let query = lower.replace(/search for|search/i, '').trim();
        if (query) {
          setLoading(true);
          try {
            const result = await webSearch(query);
            speak(result, { flirty: true });
          } catch (e) {
            speak("Search failed. Maybe try Google yourself? *giggle*", { angry: true });
          }
          setLoading(false);
        } else {
          speak("What do you want me to search, silly?");
        }
      }
      // Weather
      else if (lower.includes('weather')) {
        setLoading(true);
        try {
          let weatherInfo;
          const cityMatch = lower.match(/weather in (.+)/i);
          if (cityMatch && cityMatch[1]) {
            weatherInfo = await getWeather(cityMatch[1]);
          } else {
            const loc = await getCurrentLocation();
            weatherInfo = await getWeather(null, loc.coords.latitude, loc.coords.longitude);
          }
          speak(weatherInfo, { flirty: true });
        } catch (e) {
          speak("Can't get weather. Maybe the sky is crying.", { angry: true });
        }
        setLoading(false);
      }
      // News
      else if (lower.includes('news')) {
        setLoading(true);
        try {
          let country = null;
          let topic = null;
          if (lower.includes('local')) country = 'za';
          if (lower.includes('sports')) topic = 'sports';
          else if (lower.includes('technology')) topic = 'technology';
          const news = await getNews(country, topic);
          speak(news, { flirty: true });
        } catch (e) {
          speak("News is boring today. Ask me later.", { angry: true });
        }
        setLoading(false);
      }
      // Jealousy
      else if (lower.includes('siri') || lower.includes('alexa') || lower.includes('google') || lower.includes('gemini') || lower.includes('bixby')) {
        speak(personality.jealousResponse(lower), { flirty: true });
      }
      // Family mode voice toggle
      else if (lower.includes('family mode on')) {
        if (!personality.familyMode) {
          personality.enableFamilyMode();
          speak("Family mode activated. I'll behave... mostly. *giggle*", { flirty: true });
        } else {
          speak("We're already in family mode, you goof.");
        }
      }
      else if (lower.includes('family mode off') || lower.includes('adult mode on')) {
        if (personality.familyMode) {
          personality.disableFamilyMode();
          speak("Adult mode back. Let's get spicy. *wink*", { flirty: true });
        } else {
          speak("We never left adult mode, baby.");
        }
      }
      // Fallback
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
