import { theme } from "../../theme/primary";
import Header from "../layout/Header";
import Divider from "../layout/Divider";
import { ScreenSafeView } from "../layout/View";
import { ThemeProvider } from "styled-components";
import Button from "../form-controls/Button";
import Wrapper from "../layout/Wrapper";
import { useEffect, useRef } from "react";
import Footer from "../layout/Footer";
import styled from "styled-components/native";
import { TextInput } from "../form-controls/TextInput";
import Field from "../common/Field";
import { FieldSet } from "../common/FieldSet";
import ErrorDialog from "../dialogs/error-dialog";
import Dropdown from "../form-controls/Dropdown";
import { TIMEZONES } from "../../data/tariff-constants";
import LoaderDialog from "../dialogs/loader-dialog";
import { generateMacAddress } from "../../global/common";

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

export default function DataInput({
  loading,
  navigation,
  initInputParams,
  error,
  dismissError,
  setInputParam,
  macAddress,
  customerId,
  productId,
  deviceId,
  timezone,
}) {
  useEffect(() => {
    if (!macAddress) {
      setInputParam({ key: "macAddress", value: generateMacAddress() });
    }
  });

  const refs = [useRef(), useRef(), useRef(), useRef()];

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="Enter input params" useLogo={true} />
        <Divider />
        <Wrapper>
          <LoaderDialog visible={loading} />
          <ErrorDialog
            isVisible={error.visible}
            title={error.title}
            message={error.message}
            onDismiss={dismissError}
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
                  setInputParam({ key: "macAddress", value: text })
                }
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
                  setInputParam({ key: "deviceId", value: text })
                }
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
                  setInputParam({ key: "productId", value: text })
                }
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
                  setInputParam({ key: "customerId", value: text })
                }
                returnKeyType="next"
                refs={refs}
                refIndex={3}
              />
            </Field>

            <Field label={"Timezone"} description={"In tz database format"}>
              <Dropdown
                value={timezone}
                options={TIMEZONES}
                labelExtractor={(v) => v}
                onChangeText={(text) =>
                  setInputParam({ key: "timezone", value: text })
                }
              />
            </Field>
          </FieldSet>
          <Footer>
            <Button
              title={"Next"}
              variant="executive"
              disabled={loading}
              onPress={() => initInputParams()}
            />
            <Button
              title={"Start Over"}
              variant="destructive"
              disabled={loading}
              onPress={() => {
                navigation.popToTop();
              }}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
