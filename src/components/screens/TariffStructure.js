import Header from "../layout/Header";
import Button from "../form-controls/Button";
import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { ScreenSafeView } from "../layout/View";
import Footer from "../layout/Footer";
import Wrapper from "../layout/Wrapper";
import Main from "../layout/Main";
import styled from "styled-components/native";
import ButtonCheckbox from "../form-controls/ButtonCheckbox";
import { TARIFF_SIDE } from "../../data/tariff-constants";

const RateFactors = styled.View`
  margin-bottom: 40px;
  justify-content: flex-end;
  flex: 1;
`;

/**
 * @param navigation
 * @param route
 * @param {Tariff} plan
 * @param {(object) => void} setStructure
 * @param {( schedule: TariffSchedule) => boolean} isTimeConfigurable
 * @param {( schedule: TariffSchedule) => boolean} isSeasonConfigurable
 * @param {( schedule: Array<TariffSchedule>) => TariffSchedule} findWeekdaySchedule
 * @return {JSX.Element}
 * @constructor
 */
export default function TariffStructure({
  navigation,
  route,
  plan,
  setStructure,
  isTimeConfigurable,
  isSeasonConfigurable,
  findWeekdaySchedule,
}) {
  const { side } = route.params;
  const schedule = findWeekdaySchedule(plan[side]);

  let title = "Your tariff structure";
  let subTitle = `Which of the following affects your ${
    side === TARIFF_SIDE.IMPORT ? "import" : "export"
  } rate?\nSelect all that apply.`;

  const structure = {
    seasons: isSeasonConfigurable(schedule),
    time: isTimeConfigurable(schedule),
  };

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <Header title={title} subTitle={subTitle} />
        <Wrapper>
          <Main>
            <RateFactors>
              <ButtonCheckbox
                value={structure.seasons}
                title={"Season/Month"}
                onChange={(value) =>
                  setStructure({
                    target: side,
                    structure: { ...structure, seasons: value },
                  })
                }
              />
              <ButtonCheckbox
                title={"Time of Use"}
                value={structure.time}
                onChange={(value) =>
                  setStructure({
                    target: side,
                    structure: { ...structure, time: value },
                  })
                }
              />
              <ButtonCheckbox
                value={!structure.seasons && !structure.time}
                title={"None of the Above"}
                subTitle={"I am on flat rate"}
                onChange={(value) =>
                  setStructure({
                    target: side,
                    structure: {
                      ...structure,
                      seasons: !value,
                      time: !value,
                    },
                  })
                }
              />
            </RateFactors>
          </Main>
          <Footer>
            <Button
              title={"Next"}
              variant="executive"
              onPress={() => {
                if (structure.seasons) {
                  navigation.push("Seasons", {
                    side,
                  });
                } else {
                  navigation.push("Prices", {
                    side,
                    seasonIndex: 0,
                    daysIndex: 0,
                  });
                }
              }}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
