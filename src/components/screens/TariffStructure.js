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
import {
  findWeekdaySchedule,
  isSeasonConfigurable,
  isTimeConfigurable,
  selectPlan,
  setStructure,
} from "../../store/reducers/tariffReducer";
import { useDispatch, useSelector } from "react-redux";
import ScreenTitle from "../layout/ScreenTitle";
import { Text } from "../common/Text";

const RateFactors = styled.View`
  margin-bottom: 40px;
  justify-content: flex-end;
  flex: 1;
`;

const CentredPlaceholder = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function TariffStructure({ navigation, route }) {
  const { side } = route.params;
  const plan = useSelector(selectPlan);
  const dispatch = useDispatch();

  const schedule = findWeekdaySchedule(plan[side]);

  let title = "What affects your rate?";
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
        <ScreenTitle title={title} subTitle={subTitle} />
        <Wrapper>
          <Main>
            <RateFactors>
              <ButtonCheckbox
                value={structure.seasons}
                title={"Season/Month"}
                onChange={(value) =>
                  dispatch(
                    setStructure({
                      target: side,
                      structure: { ...structure, seasons: value },
                    })
                  )
                }
              />
              <ButtonCheckbox
                title={"Time of Use"}
                value={structure.time}
                onChange={(value) =>
                  dispatch(
                    setStructure({
                      target: side,
                      structure: { ...structure, time: value },
                    })
                  )
                }
              />

              <CentredPlaceholder>
                <Text variant={"heading"}>- OR -</Text>
              </CentredPlaceholder>

              <ButtonCheckbox
                value={!structure.seasons && !structure.time}
                title={"None of the Above"}
                subTitle={"I am on flat rate"}
                onChange={(value) =>
                  dispatch(
                    setStructure({
                      target: side,
                      structure: {
                        ...structure,
                        seasons: !value,
                        time: !value,
                      },
                    })
                  )
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
