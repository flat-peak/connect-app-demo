import { COUNTRY_CODES } from "@app/global/configs";
import {
  selectAreaEnabled,
  selectOffPeakCharge,
  setOffPeakCharge,
  startDeveloperFlow,
  startSimpleFlow,
} from "@app/global/store/reducers/contextReducer";
import {
  selectCountry,
  setAddressField,
  setCountry,
} from "@app/global/store/reducers/inputDataReducer";
import { selectLoading } from "@app/global/store/reducers/progressIndicatorReducer";
import {
  Button,
  Field,
  Footer,
  Main,
  SafeScreen,
  Text,
  Wrapper,
} from "@app/shared/ui";
import { Dropdown } from "@app/widgets";
import type { AnyAction } from "@reduxjs/toolkit";
import { useRouter } from "expo-router";
import { Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

const CentredPlaceholder = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function ScenarioSelect() {
  const offPeakCharge = useSelector(selectOffPeakCharge);
  const loading = useSelector(selectLoading);
  const country = useSelector(selectCountry);
  const area = useSelector(selectAreaEnabled);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <SafeScreen>
      <Wrapper>
        <Main>
          <Field label={"Test Country"}>
            <Dropdown
              value={country}
              options={area.map((entry) => entry.country_code)}
              labelExtractor={(key) => COUNTRY_CODES[key]}
              onChangeText={(text) => {
                dispatch(setCountry(text));
                dispatch(setAddressField({ key: "country_code", value: text }));
              }}
            />
          </Field>
          <Field
            label={"Connect my electricity provider"}
            description={"Will launch Connect experience"}
            isRow={true}
          >
            <Switch
              value={Boolean(offPeakCharge)}
              onValueChange={(enabled) => {
                dispatch(setOffPeakCharge(enabled));
                if (enabled) {
                  dispatch(setOffPeakCharge(true));
                  dispatch(startSimpleFlow({}) as unknown as AnyAction).then(
                    (resultAction) => {
                      if (startSimpleFlow.fulfilled.match(resultAction)) {
                        router.push("/provider-integration");
                      }
                      setTimeout(() => dispatch(setOffPeakCharge(false)), 400);
                    }
                  );
                }
              }}
            />
          </Field>
          <CentredPlaceholder>
            <Text variant={"heading"}>- OR -</Text>
          </CentredPlaceholder>
        </Main>
        <Footer>
          <Button
            title={"Launch advanced tools"}
            variant={"link"}
            disabled={loading}
            onPress={() => {
              dispatch(startDeveloperFlow({}) as unknown as AnyAction).then(
                (resultAction) => {
                  if (startDeveloperFlow.fulfilled.match(resultAction)) {
                    router.push("session-params");
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
