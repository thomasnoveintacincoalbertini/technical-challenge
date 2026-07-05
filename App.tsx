import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DocumentsScreen } from './src/screens/DocumentsScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <DocumentsScreen />
    </SafeAreaProvider>
  );
}
