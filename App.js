import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import MainNav from "./src/components/MainNav";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { Provider as StoreProvider } from "react-redux";

import { store } from "./src/store";
import { themeFonts } from "./src/theme/fonts";
import { theme as secondaryTheme } from "./src/theme/secondary";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(themeFonts);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <SafeAreaProvider
        style={{ backgroundColor: secondaryTheme.colors.background }}
      >
        <MainNav onLayout={onLayoutRootView} />
      </SafeAreaProvider>
    </StoreProvider>
  );
}
