import { TIMEZONES } from "@app/global/configs";
import {
  initInputParams,
  selectCustomerId,
  selectDeviceId,
  selectMacAddress,
  selectProductId,
  selectTimezone,
  setInputParam,
} from "@app/global/store/reducers/inputDataReducer";
import { selectLoading } from "@app/global/store/reducers/progressIndicatorReducer";
import {
  Button,
  Field,
  FieldSet,
  Footer,
  Main,
  SafeScreen,
  Wrapper,
  InputValue,
} from "@app/shared/ui";
import { Dropdown } from "@app/widgets";
import { AnyAction } from "@reduxjs/toolkit";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SessionParams() {
  const macAddress = useSelector(selectMacAddress);
  const customerId = useSelector(selectCustomerId);
  const productId = useSelector(selectProductId);
  const deviceId = useSelector(selectDeviceId);
  const timezone = useSelector(selectTimezone);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const router = useRouter();

  return (
    <SafeScreen>
      <Wrapper>
        <Main>
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
              dispatch(initInputParams({}) as unknown as AnyAction).then(
                (actionResult) => {
                  if (initInputParams.fulfilled.match(actionResult)) {
                    router.push(
                      (actionResult.payload as { completed: boolean }).completed
                        ? "Summary"
                        : "address-edit"
                    );
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
