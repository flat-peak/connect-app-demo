import { PriceMarker } from "./PriceMarker";
import { getPeakColor, getPeakLabel } from "../../global/peak-utils";
import { View } from "react-native";
import styled from "styled-components/native";

const GraphTableRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: ${({ isFirst }) => (isFirst ? 0 : 8)}px;
`;

const GraphTableCol = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const PrimaryText = styled.Text`
  font-size: 16px;
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text.body};
`;

export default function ScheduleSummary({ peaks }) {
  if (!peaks || !peaks.length) {
    return null;
  }

  const formatTime = (v) => v.substring(0, 5);
  return peaks.map((item, index) => {
    const nextPeak = peaks[index + 1];
    return (
      <GraphTableRow key={index.toString()}>
        <GraphTableCol>
          <PriceMarker color={getPeakColor(item.type)} />
          <View>
            <PrimaryText>{getPeakLabel(item.type)}</PrimaryText>
            <PrimaryText>
              £{item.price ? Number(item.price).toFixed(2) : "0.00"} / kWh
            </PrimaryText>
          </View>
        </GraphTableCol>
        <View>
          <PrimaryText>
            {[
              formatTime(item.timeFrom),
              formatTime(nextPeak ? nextPeak.timeFrom : peaks[0].timeFrom),
            ].join(" - ")}
          </PrimaryText>
        </View>
      </GraphTableRow>
    );
  });
}
