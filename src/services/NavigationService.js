import * as Location from 'expo-location';
import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from '@env';
import personality from './Personality';

export async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') throw new Error('Location permission denied');
  return await Location.getCurrentPositionAsync({});
}

export async function getDirections(destination) {
  const origin = await getCurrentLocation();
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.coords.latitude},${origin.coords.longitude}&destination=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(url);
  if (response.data.routes.length === 0) throw new Error('No route found');
  const steps = response.data.routes[0].legs[0].steps.map(s => s.html_instructions.replace(/<[^>]*>/g, ''));
  return steps;
}

export function reportMissedTurn() {
  personality.recordMissedTurn();
  return personality.getAngryResponse('turn');
}
