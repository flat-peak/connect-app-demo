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
import { FieldSet } from "../common/FieldSet";
import ErrorDialog from "../dialogs/error-dialog";
import Dropdown from "../form-controls/Dropdown";
import { TIMEZONES } from "../../data/tariff-constants";
import LoaderDialog from "../dialogs/loader-dialog";

import {
  initInputParams,
  selectCustomerId,
  selectDeviceId,
  selectMacAddress,
  selectProductId,
  selectTimezone,
  setInputParam,
} from "../../store/reducers/inputDataReducer";
import {
  dismissError,
  selectError,
  selectLoading,
} from "../../store/reducers/progressIndicatorReducer";
import { useDispatch, useSelector } from "react-redux";

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

export default function DataInput({ navigation }) {
  const macAddress = useSelector(selectMacAddress);
  const customerId = useSelector(selectCustomerId);
  const productId = useSelector(selectProductId);
  const deviceId = useSelector(selectDeviceId);
  const timezone = useSelector(selectTimezone);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const refs = [useRef(), useRef(), useRef(), useRef()];

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header
          navigation={navigation}
          title="Session parameters"
          useLogo={true}
        />
        <Divider />
        <Wrapper>
          <LoaderDialog visible={loading} />
          <ErrorDialog
            isVisible={error.visible}
            title={error.title}
            message={error.message}
            onDismiss={() => dispatch(dismissError())}
          />
          <FieldSet>
            <Field
              isFirst={true}
              label={"MAC address"}
              description={
                "Fill to test adding MAC address (including conflicts)"
              }
            >
              <InputValue
                //label="00-00-00-03-00-00"
                isFirst={true}
                value={macAddress}
                onChangeText={(text) =>
                  dispatch(setInputParam({ key: "macAddress", value: text }))
                }
                placeholder={"00:00:00:00:00:00"}
                refs={refs}
                refIndex={0}
              />
            </Field>

            <Field
              label={"Device Id"}
              description={
                "Fill to test editing Product by providing a Device Id only"
              }
            >
              <InputValue
                value={deviceId}
                onChangeText={(text) =>
                  dispatch(setInputParam({ key: "deviceId", value: text }))
                }
                placeholder={"dev_************************"}
                returnKeyType="next"
                refs={refs}
                refIndex={1}
              />
            </Field>
            <Field
              label={"Product Id"}
              description={"Fill to test editing Product"}
            >
              <InputValue
                value={productId}
                onChangeText={(text) =>
                  dispatch(setInputParam({ key: "productId", value: text }))
                }
                placeholder={"prd_************************"}
                returnKeyType="next"
                refs={refs}
                refIndex={2}
              />
            </Field>

            <Field
              label={"Customer Id"}
              description={"Fill to test adding Product to Customer"}
            >
              <InputValue
                value={customerId}
                onChangeText={(text) =>
                  dispatch(setInputParam({ key: "customerId", value: text }))
                }
                placeholder={"cus_************************"}
                returnKeyType="next"
                refs={refs}
                refIndex={3}
              />
            </Field>

            <Field label={"Timezone"}>
              <Dropdown
                value={timezone}
                options={TIMEZONES}
                labelExtractor={(v) => v}
                onChangeText={(text) =>
                  dispatch(setInputParam({ key: "timezone", value: text }))
                }
              />
            </Field>
          </FieldSet>
          <Footer>
            <Button
              title={"Next"}
              variant="executive"
              disabled={loading}
              onPress={() => {
                dispatch(initInputParams()).then((actionResult) => {
                  if (initInputParams.fulfilled.match(actionResult)) {
                    navigation.push(
                      actionResult.payload.completed ? "Summary" : "AddressEdit"
                    );
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
