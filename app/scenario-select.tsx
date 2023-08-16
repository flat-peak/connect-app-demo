import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import {
  selectCountry,
  setAddressField,
  setCountry,
} from "../global/store/reducers/inputDataReducer";
import {
  selectError,
  selectLoading,
} from "../global/store/reducers/progressIndicatorReducer";
import Wrapper from "../shared/ui/layout/Wrapper";
import Field from "../shared/ui/Field";
import Dropdown from "../widgets/dropdown/Dropdown";
import { COUNTRY_CODES } from "../global/configs/timezones";
import Footer from "../shared/ui/layout/Footer";
import Button from "../shared/ui/Button";
import styled from "styled-components/native";
import Main from "../shared/ui/layout/Main";
import { Switch } from "react-native";
import {
  selectAreaEnabled,
  selectOffPeakCharge,
  setOffPeakCharge,
  startDeveloperFlow,
  startSimpleFlow,
} from "../global/store/reducers/contextReducer";
import { Text } from "../shared/ui/Text";
import SafeScreen from "../shared/ui/layout/Screen";

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
                  dispatch(startSimpleFlow()).then((resultAction) => {
                    if (startSimpleFlow.fulfilled.match(resultAction)) {
                      router.push("/provider-integration");
                    }
                    setTimeout(() => dispatch(setOffPeakCharge(false)), 400);
                  });
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
              dispatch(startDeveloperFlow()).then((resultAction) => {
                if (startDeveloperFlow.fulfilled.match(resultAction)) {
                  router.push("session-params");
                }
              });
            }}
          />
        </Footer>
      </Wrapper>
    </SafeScreen>
  );
}
