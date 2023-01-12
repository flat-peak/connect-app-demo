import { theme } from "../../theme/primary";
import Header from "../layout/Header";
import Divider from "../layout/Divider";
import { ScreenSafeView } from "../layout/View";
import { ThemeProvider } from "styled-components";
import Button from "../form-controls/Button";
import Wrapper from "../layout/Wrapper";
import { InputScenarios } from "../../data/input-scenarios";

export default function ScenarioPicker({ navigation, setInputData }) {
  const scenarios = [
    { title: "From scratch", id: "blank", data: InputScenarios.BLANK },
    {
      title: "Existing product",
      id: "with_product",
      data: InputScenarios.WITH_EXISTING_PRODUCT,
    },
    {
      title: "Existing customer",
      id: "with_customer",
      data: InputScenarios.WITH_EXISTING_CUSTOMER,
    },
    {
      title: "Invalid Mac Address",
      id: "used_mac_address",
      data: InputScenarios.WITH_INVALID_MAC,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="CHOOSE A TEST SCENARIO" useLogo={true} />
        <Divider />
        <Wrapper>
          {scenarios.map((scenario) => (
            <Button
              title={scenario.title}
              key={scenario.id}
              onPress={() => {
                setInputData(scenario.data);
                navigation.push("DataInput");
              }}
            />
          ))}
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
