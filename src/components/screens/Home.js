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
import IntroBlock from "../common/IntroBlock";

export default function Home({
  loading,
  error,
  dismissError,
  offPeakCharge,
  initDefaultSession,
  initDeveloperSession,
  setOffPeakCharge,
}) {
  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="CHOOSE DEMO FLOW" useLogo={true} />
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
            <IntroBlock />
            <Field
              label={"Connect my electricity provider"}
              description={"Will open end-customer Connect experience"}
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
