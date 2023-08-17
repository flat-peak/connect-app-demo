import { COUNTRY_CODES } from "@app/global/configs";
import { selectAreaEnabled } from "@app/global/store/reducers/contextReducer";
import {
  selectAddress,
  setAddressField,
  setCountry,
} from "@app/global/store/reducers/inputDataReducer";
import {
  Button,
  Field,
  FieldSet,
  Footer,
  InputValue,
  Main,
  SafeScreen,
  Wrapper,
} from "@app/shared/ui";
import { Dropdown } from "@app/widgets";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddressEdit() {
  const { address_line1, address_line2, city, state, post_code, country_code } =
    useSelector(selectAddress);
  const area = useSelector(selectAreaEnabled);
  const dispatch = useDispatch();
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const router = useRouter();

  return (
    <SafeScreen>
      <Wrapper>
        <Main>
          <FieldSet>
            <Field label={"House number or name"} description={"Line 1"}>
              <InputValue
                value={address_line1}
                isFirst={true}
                onChangeText={(text) =>
                  dispatch(
                    setAddressField({ key: "address_line1", value: text })
                  )
                }
                refs={refs}
                refIndex={0}
              />
            </Field>
            <Field label={"Street name"} description={"Line 2"}>
              <InputValue
                value={address_line2}
                onChangeText={(text) =>
                  dispatch(
                    setAddressField({ key: "address_line2", value: text })
                  )
                }
                refs={refs}
                refIndex={1}
              />
            </Field>
            <Field label={"City"} description={"Line city"}>
              <InputValue
                value={city}
                onChangeText={(text) =>
                  dispatch(setAddressField({ key: "city", value: text }))
                }
                refs={refs}
                refIndex={2}
              />
            </Field>
            <Field label={"State"} description={"Line state"}>
              <InputValue
                label="State"
                value={state}
                onChangeText={(text) =>
                  dispatch(setAddressField({ key: "state", value: text }))
                }
                refs={refs}
                refIndex={3}
              />
            </Field>
            <Field label={"Post / ZIP code"} description={"Line post_code"}>
              <InputValue
                label="Postcode"
                value={post_code}
                onChangeText={(text) =>
                  dispatch(setAddressField({ key: "post_code", value: text }))
                }
                refs={refs}
                refIndex={4}
              />
            </Field>
            <Field label={"Country"} description={"Line country"}>
              <Dropdown
                value={country_code}
                options={area.map((entry) => entry.country_code)}
                labelExtractor={(key) => COUNTRY_CODES[key]}
                onChangeText={(text) => {
                  dispatch(setCountry(text));
                  dispatch(
                    setAddressField({ key: "country_code", value: text })
                  );
                }}
              />
            </Field>
          </FieldSet>
        </Main>
        <Footer>
          <Button
            title={"Next"}
            variant="executive"
            onPress={() => router.push("provider-select")}
          />
        </Footer>
      </Wrapper>
    </SafeScreen>
  );
}
