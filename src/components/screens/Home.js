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
import IntroBlock from "../common/IntroBlock";
import {
  selectAreaEnabled,
  selectOffPeakCharge,
  setOffPeakCharge,
} from "../../store/reducers/contextReducer";
import { selectLoading } from "../../store/reducers/providerSelectionReducer";
import {
  dismissError,
  selectError,
} from "../../store/reducers/progressIndicatorReducer";
import {
  initDefaultSession,
  initDeveloperSession,
  selectCountry,
  setCountry,
} from "../../store/reducers/inputDataReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const offPeakCharge = useSelector(selectOffPeakCharge);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const country = useSelector(selectCountry);
  const area = useSelector(selectAreaEnabled);
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView>
        <Header title="Select test option" useLogo={true} />
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
                }}
              />
            </Field>
            <IntroBlock />
            <Field
              label={"Connect my electricity provider"}
              description={"Will open end-customer Connect experience"}
              isRow={true}
            >
              <Switch
                value={Boolean(offPeakCharge)}
                onValueChange={(v) => {
                  if (!v) {
                    dispatch(setOffPeakCharge(v));
                  } else {
                    dispatch(initDefaultSession());
                  }
                }}
              />
            </Field>
          </Main>
          <Footer>
            <Button
              title={"Open Developer Tools"}
              disabled={loading}
              onPress={() => dispatch(initDeveloperSession())}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
