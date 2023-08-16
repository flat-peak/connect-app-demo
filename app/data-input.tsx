import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRouter } from "expo-router";
import {
  selectError,
  selectLoading,
} from "../global/store/reducers/progressIndicatorReducer";
import { useRef } from "react";
import Wrapper from "../shared/ui/layout/Wrapper";
import Field from "../shared/ui/Field";
import { Linking } from "react-native";
import Footer from "../shared/ui/layout/Footer";
import Button from "../shared/ui/Button";
import styled from "styled-components/native";
import Main from "../shared/ui/layout/Main";
import { TextInput } from "../shared/ui/TextInput";
import {
  selectApiUrl,
  selectDashboardUrl,
  selectPublishableKey,
  setApiUrl,
  setPublishableKey,
} from "../global/store/reducers/keySetupReducer";
import IntroBlock from "../shared/ui/IntroBlock";
import { initContext } from "../global/store/reducers/contextReducer";
import SafeScreen from "../shared/ui/layout/Screen";

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

export default function DataInput() {
  const apiUrl = useSelector(selectApiUrl);
  const publishableKey = useSelector(selectPublishableKey);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dashboardUrl = useSelector(selectDashboardUrl);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const router = useRouter();

  const refs = [useRef(), useRef()];
  return (
    <SafeScreen>
      <Wrapper>
        <Main>
          <Field
            isFirst={true}
            label={"API Url"}
            description={"Leave default to https://api.flatpeak.energy"}
          >
            <InputValue
              isFirst={true}
              value={apiUrl}
              placeholder={"https://api.flatpeak.energy"}
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
              placeholder={"pk_****_************************"}
              onChangeText={(text) => dispatch(setPublishableKey(text))}
              returnKeyType="next"
              refs={refs}
              refIndex={1}
            />
          </Field>
          <IntroBlock />
          <Button
            title={"Get keys from dashboard"}
            variant="link"
            onPress={() => {
              const linkToKeys = `${dashboardUrl}/keys`;
              Linking.canOpenURL(linkToKeys).then((supported) => {
                if (supported) {
                  Linking.openURL(linkToKeys);
                }
              });
            }}
          />
        </Main>
        <Footer>
          <Button
            title={"Next"}
            variant="executive"
            disabled={!publishableKey.trim() || !apiUrl.trim() || loading}
            onPress={() => {
              dispatch(initContext()).then((resultAction) => {
                if (initContext.fulfilled.match(resultAction)) {
                  router.push("scenario-select");
                }
              });
            }}
          />
        </Footer>
      </Wrapper>
    </SafeScreen>
  );
}
