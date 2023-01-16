import styled from "styled-components/native";

const PeriodContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PeriodBox = styled.View`
  background-color: #07a1ff;
  border-radius: 5px;
  padding: 1px 6px;
  margin-right: 20px;
`;

const PeriodLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.body};
  color: #ffffff;
  font-size: 20px;
  line-height: 24px;
`;

export default function PeriodCaption({ monthFrom, monthTo, dayFrom, dayTo }) {
  const printRangeLabel = (from, to) => {
    const rangeFromLabel = typeof from !== "undefined" ? String(from) : "";
    const rangeToLabel = typeof to !== "undefined" ? String(to) : "";
    if (!rangeFromLabel || !rangeFromLabel) {
      return rangeFromLabel || rangeToLabel;
    }
    if (rangeFromLabel === rangeToLabel) {
      return rangeFromLabel;
    }
    return `${rangeFromLabel} - ${rangeToLabel}`;
  };
  return (
    <PeriodContainer>
      <PeriodBox>
        <PeriodLabel>{printRangeLabel(monthFrom, monthTo)}</PeriodLabel>
      </PeriodBox>
      <PeriodBox>
        <PeriodLabel>{printRangeLabel(dayFrom, dayTo)}</PeriodLabel>
      </PeriodBox>
    </PeriodContainer>
  );
}
