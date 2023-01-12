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
  return (
    <PeriodContainer>
      <PeriodBox>
        <PeriodLabel>{`${monthFrom} - ${monthTo}`}</PeriodLabel>
      </PeriodBox>
      <PeriodBox>
        <PeriodLabel>{`${dayFrom} - ${dayTo}`}</PeriodLabel>
      </PeriodBox>
    </PeriodContainer>
  );
}
