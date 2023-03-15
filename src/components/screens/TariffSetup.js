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

export default function TariffSetup({
  navigation,
  displayName,
  exportEnabled,
  setDisplayName,
  setExportEnabled,
}) {
  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <Header title="What your tariff name?" />
        <Wrapper>
          <Main>
            <TextInput value={displayName} onChangeText={setDisplayName} />
          </Main>

          <Footer>
            <Checkbox
              value={exportEnabled}
              title={"I also export my electricity"}
              onChange={(v) => setExportEnabled(v)}
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
