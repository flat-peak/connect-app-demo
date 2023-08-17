import { Linking, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import {
  selectCustomerId,
  selectDeviceId,
  selectProductId,
  selectTariffId,
} from "../global/store/reducers/outputDataReducer";
import {
  setOffPeakCharge,
  startDeveloperFlow,
} from "../global/store/reducers/contextReducer";
import { selectDashboardUrl } from "../global/store/reducers/keySetupReducer";
import SafeScreen from "../shared/ui/layout/Screen";
import { Text } from "../shared/ui/Text";
import Wrapper from "../shared/ui/layout/Wrapper";
import Main from "../shared/ui/layout/Main";
import Field from "../shared/ui/Field";
import Footer from "../shared/ui/layout/Footer";
import Button from "../shared/ui/Button";
import { TextInput } from "../shared/ui/TextInput";
import { useNavigation, useRouter } from "expo-router";

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

export default function DataOutput() {
  const productId = useSelector(selectProductId);
  const tariffId = useSelector(selectTariffId);
  const customerId = useSelector(selectCustomerId);
  const deviceId = useSelector(selectDeviceId);
  const dashboardUrl = useSelector(selectDashboardUrl);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeScreen>
      <Wrapper>
        <Main>
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
                dispatch(setOffPeakCharge(false));
                navigation.popToTop();
              }}
            />
          </Field>

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
        </Main>
        <Footer>
          <Button
            variant="executive"
            title={"View Rates"}
            onPress={() => {
              const linkToRates = `${dashboardUrl}/devices/${deviceId}/rates`;
              Linking.canOpenURL(linkToRates).then((supported) => {
                if (supported) {
                  Linking.openURL(linkToRates);
                }
              });
            }}
          />
          <Button
            title={"Restart Developer Tools"}
            onPress={() => {
              dispatch(startDeveloperFlow()).then((resultAction) => {
                if (startDeveloperFlow.fulfilled.match(resultAction)) {
                  navigation.dispatch({ type: "POP_TO_TOP" });
                }
              });
            }}
          />
        </Footer>
      </Wrapper>
    </SafeScreen>
  );
}
