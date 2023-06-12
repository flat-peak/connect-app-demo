import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import NavBar from "./layout/NavBar";
import ProviderSelection from "./screens/ProviderSelection";
import TariffSetup from "./screens/TariffSetup";
import Seasons from "./screens/Seasons";
import Prices from "./screens/Prices";
import Summary from "./screens/Summary";
import AddressEdit from "./screens/AddressEdit";
import DataInput from "./screens/DataInput";
import DataOutput from "./screens/DataOutput";
import { ThemeProvider } from "styled-components";
import { theme as secondaryTheme } from "../theme/secondary";
import TariffStructure from "./screens/TariffStructure";
import ProviderIntegration from "./screens/ProviderIntegration";
import Home from "./screens/Home";
import { setNavigationRef } from "./Navigator";
import KeySetup from "./screens/KeySetup";

const Stack = createStackNavigator();

const primaryOptions = {
  headerShown: false,
};

const altOptions = {
  title: "",
  headerStyle: {
    borderWidth: 0,
  },
  header: ({ navigation, options }) => (
    <ThemeProvider theme={secondaryTheme}>
      <NavBar navigation={navigation} options={options} />
    </ThemeProvider>
  ),
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export const verticalAnimation = {
  gestureDirection: "vertical",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function MainNav() {
  return (
    <NavigationContainer theme={navTheme} ref={(ref) => setNavigationRef(ref)}>
      <Stack.Navigator>
        <Stack.Screen
          name={"KeySetup"}
          component={KeySetup}
          options={primaryOptions}
        />
        <Stack.Screen name={"Home"} component={Home} options={primaryOptions} />
        <Stack.Screen
          name={"DataInput"}
          component={DataInput}
          options={primaryOptions}
        />
        <Stack.Screen
          name={"AddressEdit"}
          component={AddressEdit}
          options={primaryOptions}
        />
        <Stack.Screen
          name={"ProviderSelection"}
          component={ProviderSelection}
          options={{ ...altOptions, ...verticalAnimation }}
        />
        <Stack.Screen
          name={"ProviderIntegration"}
          component={ProviderIntegration}
          options={{
            ...altOptions,
            ...verticalAnimation,
            displayProviderLogo: false,
            header: ({ navigation, options }) => (
              <ThemeProvider theme={secondaryTheme}>
                <NavBar
                  navigation={navigation}
                  options={options}
                  border={true}
                />
              </ThemeProvider>
            ),
          }}
        />
        <Stack.Screen
          name={"TariffSetup"}
          component={TariffSetup}
          options={{ ...altOptions, displayProviderLogo: false }}
        />
        <Stack.Screen
          name={"TariffStructure"}
          component={TariffStructure}
          options={{ ...altOptions, displayProviderLogo: true }}
        />
        <Stack.Screen
          name={"Seasons"}
          component={Seasons}
          options={{ ...altOptions, displayProviderLogo: true }}
        />
        <Stack.Screen
          name={"Prices"}
          component={Prices}
          options={{ ...altOptions, displayProviderLogo: true }}
        />
        <Stack.Screen
          name={"Summary"}
          component={Summary}
          options={{ ...altOptions, displayProviderLogo: true }}
        />
        <Stack.Screen
          name={"DataOutput"}
          component={DataOutput}
          options={primaryOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
