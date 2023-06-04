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
  selectPlan,
  selectStructure,
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
  const structure = useSelector(selectStructure);
  const plan = useSelector(selectPlan);
  const dispatch = useDispatch();

  let title = "What affects your rate?";
  let subTitle = `Which of the following affects your ${
    side === TARIFF_SIDE.IMPORT ? "import" : "export"
  } rate?\nSelect all that apply.`;

  // console.log("PLAN", JSON.stringify(plan.import[0], null, 2));
  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <ScreenTitle title={title} subTitle={subTitle} />
        <Wrapper>
          <Main>
            <RateFactors>
              <ButtonCheckbox
                title={"Time of Use"}
                value={structure.hours}
                onChange={(value) =>
                  dispatch(
                    setStructure({
                      target: side,
                      structure: {
                        hours: value,
                        days: structure.days,
                        months: structure.months,
                      },
                    })
                  )
                }
              />
              <ButtonCheckbox
                title={"Weekday/Weekend"}
                value={structure.days}
                onChange={(value) =>
                  dispatch(
                    setStructure({
                      target: side,
                      structure: {
                        hours: structure.hours,
                        days: value,
                        months: structure.months,
                      },
                    })
                  )
                }
              />
              <ButtonCheckbox
                value={structure.months}
                title={"Season/Month"}
                onChange={(value) =>
                  dispatch(
                    setStructure({
                      target: side,
                      structure: {
                        hours: structure.hours,
                        days: structure.days,
                        months: value,
                      },
                    })
                  )
                }
              />

              <CentredPlaceholder>
                <Text variant={"heading"}>- OR -</Text>
              </CentredPlaceholder>

              <ButtonCheckbox
                value={!structure.days && !structure.hours && !structure.months}
                title={"None of the Above"}
                subTitle={"I am on flat rate"}
                onChange={(value) =>
                  dispatch(
                    setStructure({
                      target: side,
                      structure: {
                        hours: false,
                        days: false,
                        months: false,
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
                if (structure.months) {
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
