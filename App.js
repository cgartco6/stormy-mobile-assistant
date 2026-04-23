import { Switch, View, Text } from 'react-native';

// In App component state:
const [familyMode, setFamilyMode] = useState(personality.familyMode);

const toggleFamilyMode = (value) => {
  setFamilyMode(value);
  if (value) personality.enableFamilyMode();
  else personality.disableFamilyMode();
  speak(value ? "Switched to family mode. No swearing, I promise." : "Adult mode back. Let's get spicy.");
};

// Add to your main view:
<View style={styles.switchContainer}>
  <Text>👪 Family Mode</Text>
  <Switch value={familyMode} onValueChange={toggleFamilyMode} />
</View>
