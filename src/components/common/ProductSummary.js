import { SectionTitle } from "../form-controls/Section";
import styled from "styled-components/native";

export const ProductSummaryContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductSummaryTitle = styled.Text`
  align-items: center;
`;

export function ProductSummary({ provider, title }) {
  return (
    <ProductSummaryContainer>
      <SectionTitle>
        <ProductSummaryTitle>Tariff name: {title}</ProductSummaryTitle>
      </SectionTitle>
    </ProductSummaryContainer>
  );
}
