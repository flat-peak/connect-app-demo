import { Text } from "@app/shared/ui";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import DropdownDialog from "./DropdownDialog";

export const DropdownContainer = styled.View`
  background-color: #cccccc;
  height: 44px;
  border-radius: 10px;
  padding: 0 18px;
  font-family: ${({ theme }) => theme.fonts.body};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const DropdownIcon = styled(Ionicons).attrs(() => {
  return {
    name: "triangle",
    size: 12,
    color: "#000000",
  };
})`
  transform: rotate(180deg);
`;

export default function Dropdown({
  value,
  options,
  labelExtractor,
  onChangeText,
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (nextValue) => {
    setOpen(false);
    onChangeText(nextValue);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <DropdownDialog
        isVisible={open}
        value={value}
        options={options}
        labelExtractor={labelExtractor}
        onConfirm={handleSelect}
        onCancel={handleCancel}
      />
      <TouchableOpacity onPress={() => setOpen(true)}>
        <DropdownContainer>
          <Text variant="input-value">{labelExtractor(value)}</Text>
          <DropdownIcon />
        </DropdownContainer>
      </TouchableOpacity>
    </>
  );
}
