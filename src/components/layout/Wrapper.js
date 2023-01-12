import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.screenHorizontalOffset}px;
`;

export default Wrapper;
