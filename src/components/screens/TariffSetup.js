import Header from "../layout/Header";
import Button from "../form-controls/Button";
import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { ScreenSafeView } from "../layout/View";
import Footer from "../layout/Footer";
import Wrapper from "../layout/Wrapper";
import Main from "../layout/Main";
import { TextInput } from "../form-controls/TextInput";
import { TARIFF_SIDE } from "../../data/tariff-constants";
import Checkbox from "../form-controls/Checkbox";
import {
  selectDisplayName,
  selectExportEnabled,
  setDisplayName,
  setExportEnabled,
} from "../../store/reducers/tariffReducer";
import { useDispatch, useSelector } from "react-redux";

export default function TariffSetup({ navigation }) {
  const displayName = useSelector(selectDisplayName);
  const exportEnabled = useSelector(selectExportEnabled);
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <Header title="What your tariff name?" />
        <Wrapper>
          <Main>
            <TextInput
              value={displayName}
              onChangeText={(v) => dispatch(setDisplayName(v))}
            />
          </Main>

          <Footer>
            <Checkbox
              value={exportEnabled}
              title={"I also export my electricity"}
              onChange={(v) => dispatch(setExportEnabled(v))}
            />
            <Button
              title={"Next"}
              variant="executive"
              onPress={() => {
                navigation.push("TariffStructure", {
                  side: TARIFF_SIDE.IMPORT,
                });
              }}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
