import styled from "styled-components/native";
import { TextInput, TouchableOpacity } from "react-native";

export const EditableTableRow = styled.View`
  flex-direction: row;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : 18)}px;
  justify-content: space-between;
`;

export const EditableTableBoxes = styled.View`
  width: 85%;
  flex-direction: row;
  justify-content: space-between;
`;

export const EditableTableBox = styled(TouchableOpacity)`
  background-color: #ffffff;
  border-width: 1px;
  border-color: #000000;
  border-radius: 10px;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  padding: 7px 14px;
  margin-left: ${({ isFirst }) => (isFirst ? 0 : 18)}px;
`;

export const EditableTableControl = styled.View`
  width: 35px;
  height: 65px;
  align-items: center;
  justify-content: center;
`;

export const EditableTableGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const EditableTableLabel = styled.Text`
  font-size: 17px;
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: #2c1a56;
`;

export const EditableTableValue = styled.Text`
  font-size: ${({ isLong }) => (isLong ? 14 : 16)}px;
  line-height: 22px;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: #333333;
`;

export const EditableTableInput = styled(TextInput)`
  font-size: ${({ isLong }) => (isLong ? 14 : 16)}px;
  line-height: 22px;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: #333333;
  padding: 0;
  top: -2px;
`;
