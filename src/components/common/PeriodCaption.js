import styled from "styled-components/native";
import { formatDateRanges, formatRangeValues } from "../../global/common";

const PeriodContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  margin: -10px;
`;

const PeriodBox = styled.View`
  background-color: #07a1ff;
  border-radius: 5px;
  padding: 1px 6px;
  margin: 10px;
`;

const PeriodLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.body};
  color: #ffffff;
  font-size: 20px;
  line-height: 24px;
`;

export default function PeriodCaption({
  monthFrom,
  monthTo,
  dates,
  dayFrom,
  dayTo,
}) {
  return (
    <PeriodContainer>
      <PeriodBox>
        <PeriodLabel>{formatRangeValues(monthFrom, monthTo)}</PeriodLabel>
      </PeriodBox>

      {Boolean(dates.length) && (
        <PeriodBox>
          <PeriodLabel>{formatDateRanges(dates)}</PeriodLabel>
        </PeriodBox>
      )}

      <PeriodBox>
        <PeriodLabel>{formatRangeValues(dayFrom, dayTo)}</PeriodLabel>
      </PeriodBox>
    </PeriodContainer>
  );
}
