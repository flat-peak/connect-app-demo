import { initContext } from "@app/global/store/reducers/contextReducer";
import {
  selectApiUrl,
  selectDashboardUrl,
  selectPublishableKey,
  setApiUrl,
  setPublishableKey,
} from "@app/global/store/reducers/keySetupReducer";
import { selectLoading } from "@app/global/store/reducers/progressIndicatorReducer";
import {
  Button,
  Field,
  Footer,
  InputValue,
  IntroBlock,
  Main,
  SafeScreen,
  Wrapper,
} from "@app/shared/ui";
import { AnyAction } from "@reduxjs/toolkit";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function DataInput() {
  const apiUrl = useSelector(selectApiUrl);
  const publishableKey = useSelector(selectPublishableKey);
  const loading = useSelector(selectLoading);
  const dashboardUrl = useSelector(selectDashboardUrl);
  const dispatch = useDispatch();
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
              dispatch(initContext({}) as unknown as AnyAction).then(
                (resultAction) => {
                  if (initContext.fulfilled.match(resultAction)) {
                    router.push("scenario-select");
                  }
                }
              );
            }}
          />
        </Footer>
      </Wrapper>
    </SafeScreen>
  );
}
