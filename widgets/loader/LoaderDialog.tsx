import React from "react";
import { ActivityIndicator, Modal } from "react-native";
import styled from "styled-components/native";

const ModalBackground = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: #00000040;
`;

const ModalWrapper = styled.View`
  background-color: #ffffff;
  height: 100px;
  width: 100px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LoaderIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  size: "large",
  color: theme.colors.overlay,
}))``;

export default function LoaderDialog({ visible }) {
  return (
    <Modal transparent={true} animationType={"none"} visible={visible}>
      <ModalBackground>
        <ModalWrapper>
          <LoaderIndicator />
        </ModalWrapper>
      </ModalBackground>
    </Modal>
  );
}
