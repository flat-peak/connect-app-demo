import { getPeakColor } from "../../global/peak-utils";
import styled from "styled-components/native";
import { EPeakType } from "../../data/tariff-constants";

export const graphPeriodPart = (currentPeak, nextPeak) => {
  let [currentHours, currentMinutes] = currentPeak.timeFrom.split(":");
  let [nextHours, nextMinutes] = nextPeak.timeFrom.split(":");
  let startMinutes =
    parseInt(currentHours, 10) * 60 + parseInt(currentMinutes, 10);
  let endMinutes = parseInt(nextHours, 10) * 60 + parseInt(nextMinutes, 10);
  let minutesInDay = 60 * 24;

  let deltaMinutes =
    endMinutes > startMinutes
      ? endMinutes - startMinutes
      : minutesInDay - startMinutes + endMinutes;

  return Math.round((deltaMinutes / minutesInDay) * 100);
};

const GraphContainer = styled.View`
  height: 22px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 23px;
  margin-bottom: 15px;
`;

const GraphSlice = styled.View`
  width: 20px;
  flex-basis: 15px;
  background-color: ${({ color }) => color};
  height: ${({ type }) => (type === EPeakType.OFF ? 11 : 22)}px;
  flex: ${({ part }) => part};
`;

export default function ScheduleGraph({ peaks }) {
  if (!peaks || !peaks.length) {
    return null;
  }
  return (
    <GraphContainer>
      {peaks.map((item, index) => {
        const nextPeak = peaks[index + 1];
        return (
          <GraphSlice
            key={index.toString()}
            color={getPeakColor(item.type)}
            type={item.type}
            part={graphPeriodPart(item, nextPeak || peaks[0])}
          />
        );
      })}
    </GraphContainer>
  );
}
