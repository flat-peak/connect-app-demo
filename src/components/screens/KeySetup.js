import { theme } from "../../theme/primary";
import Header from "../layout/Header";
import Divider from "../layout/Divider";
import { ScreenSafeView } from "../layout/View";
import { ThemeProvider } from "styled-components";
import Button from "../form-controls/Button";
import Wrapper from "../layout/Wrapper";
import { useRef } from "react";
import Footer from "../layout/Footer";
import styled from "styled-components/native";
import { TextInput } from "../form-controls/TextInput";
import Field from "../common/Field";
import Main from "../layout/Main";
import LoaderDialog from "../dialogs/loader-dialog";
import ErrorDialog from "../dialogs/error-dialog";
import IntroBlock from "../common/IntroBlock";

const InputValue = styled(TextInput).attrs(({ refs, refIndex }) => {
  return {
    autoCapitalize: "none",
    autoCorrect: false,
    ref: refs[refIndex],
    ...(refIndex < refs.length - 1
      ? {
          returnKeyType: "next",
          onSubmitEditing: () => refs[refIndex + 1].current.focus(),
        }
      : {}),
  };
})``;

export default function KeySetup({
  loading,
  error,
  dismissError,
  checkApiCredentials,
  apiUrl,
  publishableKey,
  setPublishableKey,
  setApiUrl,
}) {
  const refs = [useRef(), useRef()];

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="PROVIDE YOUR FLATPEAK API KEY" useLogo={true} />
        <Divider />
        <Wrapper>
          <LoaderDialog visible={loading} />
          <ErrorDialog
            isVisible={error.visible}
            title={error.title}
            message={error.message}
            onDismiss={dismissError}
          />
          <Main style={{ paddingTop: 20 }}>
            <Field
              isFirst={true}
              label={"API URL"}
              description={"Leave default to https://api.flatpeak.energy"}
            >
              <InputValue
                isFirst={true}
                value={apiUrl}
                onChangeText={(text) => setApiUrl(text)}
                returnKeyType="next"
                refs={refs}
                refIndex={0}
              />
            </Field>

            <Field
              label={"Publishable API key"}
              description={"Get your key from FlatPeak Dashboard"}
            >
              <InputValue
                value={publishableKey}
                onChangeText={(text) => setPublishableKey(text)}
                returnKeyType="submit"
                refs={refs}
                refIndex={1}
              />
            </Field>
            <IntroBlock />
          </Main>
          <Footer>
            <Button
              title={"Next"}
              variant="executive"
              disabled={!publishableKey.trim() || !apiUrl.trim() || loading}
              onPress={() => checkApiCredentials({ publishableKey, apiUrl })}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
