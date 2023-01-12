import styled from "styled-components/native";

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export default Divider;
