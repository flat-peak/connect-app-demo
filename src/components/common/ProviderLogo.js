import styled from "styled-components/native";

const ProviderLogoContainer = styled.Image.attrs(({ preview }) => ({
  resizeMode: "contain",
  source: {
    uri: preview,
  },
}))`
  width: 100px;
  height: 36px;
`;

/**
 * @param {Provider} item
 * @return {JSX.Element}
 * @constructor
 */
export default function ProviderLogo({ item }) {
  return (
    <ProviderLogoContainer
      preview={item?.display_settings?.language_assets[0]?.logo_url}
    />
  );
}
