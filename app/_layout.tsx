import { Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { themeFonts } from "../global/configs/theme/fonts";
import * as SplashScreen from "expo-splash-screen";
import { store } from "../global/store";
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { theme } from "../global/configs/theme/theme";
import { StatusBar } from "react-native";
import {
  dismissError,
  selectError,
  selectLoading,
} from "../global/store/reducers/progressIndicatorReducer";
import { ThemeProvider, useTheme } from "styled-components";
import { HeaderFactory } from "../widgets/header/Header";
import LoaderDialog from "../widgets/loader/loader-dialog";
import ErrorDialog from "../widgets/error-notifier/error-dialog";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(themeFonts);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <RootLayoutNav />
      </ThemeProvider>
    </StoreProvider>
  );
}

function RootLayoutNav() {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          header: HeaderFactory({ useNav: true }),
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen
          name={"index"}
          options={{
            title: "Enter FlatPeak API key",
            header: HeaderFactory({ useNav: false }),
          }}
        />
        <Stack.Screen
          name={"scenario-select"}
          options={{ title: "Select test scenario" }}
        />
        <Stack.Screen
          name={"session-params"}
          options={{ title: "Session parameters" }}
        />
        <Stack.Screen
          name={"address-edit"}
          options={{ title: "Full postal address" }}
        />
        <Stack.Screen
          name={"provider-integration"}
          options={{
            title: "Connect",
            headerShown: false,
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name={"data-output"}
          options={{ title: "Results summary" }}
        />
      </Stack>

      <LoaderDialog visible={loading} />
      <ErrorDialog
        isVisible={error.visible}
        title={error.title}
        message={error.message}
        onDismiss={() => dispatch(dismissError())}
      />
    </>
  );
}
