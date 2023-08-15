import { theme } from "../../theme/primary";
import Header from "../layout/Header";
import Divider from "../layout/Divider";
import { ScreenSafeView } from "../layout/View";
import { ThemeProvider } from "styled-components";
import Button from "../form-controls/Button";
import Wrapper from "../layout/Wrapper";
import Footer from "../layout/Footer";
import Field from "../common/Field";
import ErrorDialog from "../dialogs/error-dialog";
import LoaderDialog from "../dialogs/loader-dialog";
import { Switch } from "react-native";
import Main from "../layout/Main";
import Dropdown from "../form-controls/Dropdown";
import { COUNTRY_CODES } from "../../data/tariff-constants";
import {
  selectAreaEnabled,
  selectOffPeakCharge,
  setOffPeakCharge,
  startDeveloperFlow,
  startSimpleFlow,
} from "../../store/reducers/contextReducer";
import { selectLoading } from "../../store/reducers/providerSelectionReducer";
import {
  dismissError,
  selectError,
} from "../../store/reducers/progressIndicatorReducer";
import {
  selectCountry,
  setAddressField,
  setCountry,
} from "../../store/reducers/inputDataReducer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { Text } from "../common/Text";

const CentredPlaceholder = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home({ navigation }) {
  const offPeakCharge = useSelector(selectOffPeakCharge);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const country = useSelector(selectCountry);
  const area = useSelector(selectAreaEnabled);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header
          navigation={navigation}
          title="Select test scenario"
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
          <Main>
            <Field label={"Test Country"}>
              <Dropdown
                value={country}
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
                        navigation.push("ProviderIntegration");
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
                    navigation.push("DataInput");
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
