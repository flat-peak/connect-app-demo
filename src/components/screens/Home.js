import { theme } from "../../theme/primary";
import Header from "../layout/Header";
import Divider from "../layout/Divider";
import { ScreenSafeView } from "../layout/View";
import { ThemeProvider } from "styled-components";
import Button from "../form-controls/Button";
import Wrapper from "../layout/Wrapper";
import Footer from "../layout/Footer";
import Field from "../common/Field";
import ErrorDialog from "../dialogs/error-dialog";
import LoaderDialog from "../dialogs/loader-dialog";
import { Switch } from "react-native";
import Main from "../layout/Main";
import { Text } from "../common/Text";
import styled from "styled-components/native";
import { Autolink } from "react-native-autolink";

const IntroMessage = styled.View`
  margin: 24px 0 51px;
  border: 1px solid #fff;
  padding: 12px;
`;

export default function Home({
  loading,
  error,
  dismissError,
  offPeakCharge,
  initDefaultSession,
  initDeveloperSession,
  setOffPeakCharge,
}) {
  const text = `This example react-native application is developed by FlatPeak to enable developers and product owners to evaluate consumer experience they can build with FlatPeak API and SDKs.
  Email mailto:support@flatpeak.energy to request access to application source code.`;

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="CHOOSE DEMO TYPE" useLogo={true} />
        <Divider />
        <Wrapper>
          <LoaderDialog visible={loading} />
          <ErrorDialog
            isVisible={error.visible}
            title={error.title}
            message={error.message}
            onDismiss={dismissError}
          />
          <Main>
            <IntroMessage>
              <Text variant={"intro"}>
                <Autolink
                  text={text}
                  linkStyle={{
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#fff",
                  }}
                />
              </Text>
            </IntroMessage>

            <Field
              label={"Off-Peak Charge"}
              description={"To test end-consumer experience"}
              isRow={true}
            >
              <Switch
                value={offPeakCharge}
                onValueChange={(v) => {
                  if (!v) {
                    setOffPeakCharge(v);
                  } else {
                    initDefaultSession();
                  }
                }}
              />
            </Field>
          </Main>
          <Footer>
            <Button
              title={"Open Developer Tools"}
              disabled={loading}
              onPress={() => initDeveloperSession()}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
