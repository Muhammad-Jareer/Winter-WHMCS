// app/_layout.tsx
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ /* … */ });
  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false}}>
        <Stack.Screen
          name="(drawer)"
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen 
        name='+not-found'
        options={{ headerShown: false, title: 'Not Found' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}