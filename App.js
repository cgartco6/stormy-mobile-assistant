import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Switch, Alert } from 'react-native';
import MapView from 'react-native-maps';
import VoiceButton from './src/components/VoiceButton';
import personality from './src/services/Personality';
import { speak } from './src/services/SpeechService';
import * as Location from 'expo-location';

export default function App() {
  const [familyMode, setFamilyMode] = useState(personality.familyMode);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Allow location for navigation.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const toggleFamilyMode = (value) => {
    setFamilyMode(value);
    if (value) {
      personality.enableFamilyMode();
      speak("Switched to family mode. No swearing, I promise.");
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
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: location?.coords.latitude || -33.9249,
          longitude: location?.coords.longitude || 18.4241,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
  map: { flex: 1, margin: 12, borderRadius: 20 },
});
