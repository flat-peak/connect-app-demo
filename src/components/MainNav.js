import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import NavBar from "./layout/NavBar";
import ProviderSelectionConnected from "./screens/ProviderSelectionConnected";
import TariffSetupConnected from "./screens/TariffSetupConnected";
import SeasonsConnected from "./screens/SeasonsConnected";
import PricesConnected from "./screens/PricesConnected";
import SummaryConnected from "./screens/SummaryConnected";
import AddressEditConnected from "./screens/AddressEditConnected";
import DataInputConnected from "./screens/DataInputConnected";
import DataOutputConnected from "./screens/DataOutputConnected";
import { ThemeProvider } from "styled-components";
import { theme as secondaryTheme } from "../theme/secondary";
import ScenarioPickerConnected from "./screens/ScenarioPickerConnected";
import TariffStructureConnected from "./screens/TariffStructureConnected";
import ProviderIntegrationConnected from "./screens/ProviderIntegrationConnected";
import HomeConnected from "./screens/HomeConnected";
import { setNavigationRef } from "./Navigator";

const Stack = createStackNavigator();

const primaryOptions = {
  headerShown: false,
};

const altOptions = {
  title: "",
  headerStyle: {
    borderWidth: 0,
  },
  header: ({ navigation }) => (
    <ThemeProvider theme={secondaryTheme}>
      <NavBar navigation={navigation} />
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
          name={"Home"}
          component={HomeConnected}
          options={primaryOptions}
        />
        <Stack.Screen
          name={"ScenarioPicker"}
          component={ScenarioPickerConnected}
          options={primaryOptions}
        />
        <Stack.Screen
          name={"DataInput"}
          component={DataInputConnected}
          options={primaryOptions}
        />
        <Stack.Screen
          name={"AddressEdit"}
          component={AddressEditConnected}
          options={primaryOptions}
        />
        <Stack.Screen
          name={"ProviderSelection"}
          component={ProviderSelectionConnected}
          options={{ ...altOptions, ...verticalAnimation }}
        />
        <Stack.Screen
          name={"ProviderIntegration"}
          component={ProviderIntegrationConnected}
          options={{ ...altOptions, ...verticalAnimation }}
        />
        <Stack.Screen
          name={"TariffSetup"}
          component={TariffSetupConnected}
          options={altOptions}
        />
        <Stack.Screen
          name={"TariffStructure"}
          component={TariffStructureConnected}
          options={altOptions}
        />
        <Stack.Screen
          name={"Seasons"}
          component={SeasonsConnected}
          options={altOptions}
        />
        <Stack.Screen
          name={"Prices"}
          component={PricesConnected}
          options={altOptions}
        />
        <Stack.Screen
          name={"Summary"}
          component={SummaryConnected}
          options={altOptions}
        />
        <Stack.Screen
          name={"DataOutput"}
          component={DataOutputConnected}
          options={primaryOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
