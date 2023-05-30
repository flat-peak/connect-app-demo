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
import {
  selectApiUrl,
  selectPublishableKey,
  setApiUrl,
  setPublishableKey,
} from "../../store/reducers/keySetupReducer";
import { dismissError, selectError, selectLoading } from "../../store/reducers/progressIndicatorReducer";
import { useDispatch, useSelector } from "react-redux";
import { initContext } from "../../store/reducers/contextReducer";

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

export default function KeySetup({ navigation }) {
  const apiUrl = useSelector(selectApiUrl);
  const publishableKey = useSelector(selectPublishableKey);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const refs = [useRef(), useRef()];

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="Provide FlatPeak API Key" useLogo={true} />
        <Divider />
        <Wrapper>
          <LoaderDialog visible={loading} />
          <ErrorDialog
            isVisible={error.visible}
            title={error.title}
            message={error.message}
            onDismiss={() => dispatch(dismissError())}
          />
          <Main style={{ paddingTop: 20 }}>
            <Field
              isFirst={true}
              label={"API Url"}
              description={"Leave default to https://api.flatpeak.energy"}
            >
              <InputValue
                isFirst={true}
                value={apiUrl}
                onChangeText={(text) => dispatch(setApiUrl(text))}
                returnKeyType="next"
                refs={refs}
                refIndex={0}
              />
            </Field>

            <Field
              label={"Publishable API key"}
              description={"Publishable key from FlatPeak Dashboard"}
            >
              <InputValue
                value={publishableKey}
                onChangeText={(text) => dispatch(setPublishableKey(text))}
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
              onPress={() => {
                dispatch(initContext()).then((resultAction) => {
                  if (initContext.fulfilled.match(resultAction)) {
                    navigation.push("Home");
                  }
                });
              }}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
