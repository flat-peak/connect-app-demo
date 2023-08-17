import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import {
  initInputParams,
  selectCustomerId,
  selectDeviceId,
  selectMacAddress,
  selectProductId,
  selectTimezone,
  setInputParam,
} from "../global/store/reducers/inputDataReducer";
import {
  selectError,
  selectLoading,
} from "../global/store/reducers/progressIndicatorReducer";
import { useRef } from "react";
import Wrapper from "../shared/ui/layout/Wrapper";
import Field from "../shared/ui/Field";
import Dropdown from "../widgets/dropdown/Dropdown";
import { TIMEZONES } from "../global/configs/timezones";
import Footer from "../shared/ui/layout/Footer";
import Button from "../shared/ui/Button";
import styled from "styled-components/native";
import { FieldSet } from "../shared/ui/FieldSet";

import { TextInput } from "../shared/ui/TextInput";
import Main from "../shared/ui/layout/Main";
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

export default function SessionParams() {
  const macAddress = useSelector(selectMacAddress);
  const customerId = useSelector(selectCustomerId);
  const productId = useSelector(selectProductId);
  const deviceId = useSelector(selectDeviceId);
  const timezone = useSelector(selectTimezone);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const router = useRouter();

  return (
    <SafeScreen>
      <Wrapper>
        <Main style={{ paddingTop: 20 }}>
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
        </Main>
        <Footer>
          <Button
            title={"Next"}
            variant="executive"
            disabled={loading}
            onPress={() => {
              dispatch(initInputParams()).then((actionResult) => {
                if (initInputParams.fulfilled.match(actionResult)) {
                  router.push(
                    actionResult.payload.completed ? "Summary" : "address-edit"
                  );
                }
              });
            }}
          />
        </Footer>
      </Wrapper>
    </SafeScreen>
  );
}
