import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import VoiceButton from './src/components/VoiceButton';
import MapView from 'react-native-maps';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌩️ Stormy Assistant</Text>
        <Text style={styles.subtitle}>Unfiltered. Flirty. Furious.</Text>
      </View>
      <MapView style={styles.map} showsUserLocation={true} />
      <VoiceButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#e94560' },
  subtitle: { fontSize: 14, color: '#aaa' },
  map: { flex: 1, margin: 12, borderRadius: 20 },
});
