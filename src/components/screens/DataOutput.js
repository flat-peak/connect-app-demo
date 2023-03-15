import { theme } from "../../theme/primary";
import Header from "../layout/Header";
import Divider from "../layout/Divider";
import { ScreenSafeView } from "../layout/View";
import { ThemeProvider } from "styled-components";
import Button from "../form-controls/Button";
import Wrapper from "../layout/Wrapper";
import { TextInput } from "../form-controls/TextInput";
import { Text } from "../common/Text";
import styled from "styled-components/native";
import Main from "../layout/Main";
import Footer from "../layout/Footer";
import Field from "../common/Field";
import { Switch } from "react-native";
import IntroBlock from "../common/IntroBlock";

const InputRow = styled.View`
  margin: 11px 0;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const InputValue = styled(TextInput).attrs(() => {
  return {
    autoCapitalize: "none",
    readonly: true,
    autoCorrect: false,
  };
})`
  width: 70%;
`;

export default function DataOutput({
  navigation,
  productId,
  tariffId,
  deviceId,
  customerId,
  developerMode,
  setOffPeakCharge,
  initDeveloperSession,
}) {
  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="Results summary" useLogo={true} />
        <Divider />
        <Wrapper>
          <Main>
            {!developerMode && <IntroBlock />}
            <Field
              label={"Connected to electricity provider"}
              description={"Your {device} is receiving your electricity tariff"}
              isRow={true}
            >
              <Switch
                value={true}
                onValueChange={(v) => {
                  if (v) {
                    return;
                  }
                  setOffPeakCharge(false);
                  navigation.popToTop();
                }}
              />
            </Field>

            {developerMode && (
              <>

                <InputRow>
                  <Text variant="ui-control">Customer Id</Text>
                  <InputValue value={customerId} />
                </InputRow>

                <InputRow>
                  <Text variant="ui-control">Product Id</Text>
                  <InputValue value={productId} />
                </InputRow>

                <InputRow>
                  <Text variant="ui-control">Tariff Id</Text>
                  <InputValue value={tariffId} />
                </InputRow>

                <InputRow>
                  <Text variant="ui-control">Device Id</Text>
                  <InputValue value={deviceId} />
                </InputRow>
              </>
            )}
          </Main>
          <Footer>
            <Button
              title={"Restart Developer Tools"}
              onPress={() => initDeveloperSession()}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
