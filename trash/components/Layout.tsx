// In your navigation setup
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Layout>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </Layout>
  );
}
