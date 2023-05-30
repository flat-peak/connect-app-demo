import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { ScreenSafeView } from "../layout/View";
import Wrapper from "../layout/Wrapper";
import Main from "../layout/Main";
import { TARIFF_SIDE } from "../../data/tariff-constants";
import { selectDisplayName, selectExportEnabled, setDisplayName } from "../../store/reducers/tariffReducer";
import { useDispatch, useSelector } from "react-redux";
import ScreenTitle from "../layout/ScreenTitle";
import TariffWarningBlock from "../common/TariffWarningBlock";
import TariffNameForm from "../common/TariffNameForm";

export default function TariffSetup({ navigation }) {
  const displayName = useSelector(selectDisplayName);
  const exportEnabled = useSelector(selectExportEnabled);
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <ScreenTitle title="Your tariff plan" />
        <Wrapper>
          <Main>
            <TariffWarningBlock />
            <TariffNameForm
              value={displayName}
              onChangeText={(v) => dispatch(setDisplayName(v))}
              onProceed={() => {
                navigation.push("TariffStructure", {
                  side: TARIFF_SIDE.IMPORT,
                });
              }}
              onCancel={() => {
                navigation.goBack();
              }}
            />
          </Main>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
