import styled from "styled-components/native";

const rowLayout = (theme) => `
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const columnLayout = (theme) => "";

const FieldRow = styled.View`
  margin: ${({ isFirst }) => (isFirst ? 0 : 6)}px 0 6px;
  min-height: 48px;
  ${({ isRow, theme }) => (isRow ? rowLayout(theme) : columnLayout(theme))}
`;

const FieldLabel = styled.View`
  justify-content: center;
`;

const FieldControl = styled.View`
  justify-content: flex-end;
  margin-top: 6px;
`;

const FieldTitle = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.heading};
  font-family: ${({ theme }) => theme.fonts.subHeading};
`;

const FieldDescription = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.subHeading};
  font-family: ${({ theme }) => theme.fonts.uiControl};
`;

export default function Field({
  label,
  description,
  children,
  isFirst,
  isRow,
}) {
  return (
    <FieldRow isFirst={isFirst} isRow={isRow}>
      <FieldLabel>
        <FieldTitle>{label}</FieldTitle>
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </FieldLabel>
      <FieldControl>{children}</FieldControl>
    </FieldRow>
  );
}
