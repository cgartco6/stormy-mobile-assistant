import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Switch, Alert } from 'react-native';
import MapView from './src/components/MapView';
import VoiceButton from './src/components/VoiceButton';
import personality from './src/services/Personality';
import { speak } from './src/services/SpeechService';
import * as Location from 'expo-location';

export default function App() {
  const [familyMode, setFamilyMode] = useState(personality.familyMode);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Allow location for navigation and weather.');
      } else {
        setHasLocation(true);
      }
    })();
  }, []);

  const toggleFamilyMode = (value) => {
    setFamilyMode(value);
    if (value) {
      personality.enableFamilyMode();
      speak("Family mode activated. I'll behave... mostly. *giggle*");
    } else {
      personality.disableFamilyMode();
      speak("Adult mode back. Let's get spicy. *wink*", { flirty: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌩️ Stormy Assistant</Text>
        <Text style={styles.subtitle}>Unfiltered. Flirty. Furious.</Text>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>👪 Family Mode</Text>
        <Switch value={familyMode} onValueChange={toggleFamilyMode} />
      </View>
      <MapView />
      <VoiceButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#e94560' },
  subtitle: { fontSize: 14, color: '#aaa' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 },
  switchLabel: { color: 'white', fontSize: 16 },
});
