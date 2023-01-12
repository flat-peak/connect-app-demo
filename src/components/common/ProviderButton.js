import styled from "styled-components/native";

const ProviderButtonContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.buttons.options};
  border-radius: ${({ theme }) => theme.roundness}px;
  margin-bottom: 20px;
  height: 68px;
  justify-content: center;
`;

const ProviderContainImage = styled.Image.attrs(({ preview }) => ({
  resizeMode: "contain",
  source: {
    uri: preview,
  },
}))`
  width: 100%;
  height: 40px;
`;

/**
 * @param {Provider} item
 * @return {JSX.Element}
 * @constructor
 */
export default function ProviderButton({ item }) {
  return (
    <ProviderButtonContainer>
      <ProviderContainImage
        preview={item.display_settings.language_assets[0].logo_url}
      />
    </ProviderButtonContainer>
  );
}
