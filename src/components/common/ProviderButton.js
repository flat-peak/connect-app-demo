import styled from "styled-components/native";
import { useEffect, useState } from "react";
import { Text } from "./Text";

const ProviderButtonContainer = styled.View`
  border-radius: ${({ theme }) => theme.roundness}px;
  margin-bottom: 12px;
  height: 68px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const ProviderContainImage = styled.Image.attrs(({ preview }) => ({
  resizeMode: "contain",
  source: {
    uri: preview,
  },
}))`
  width: 100%;
  max-width: 140px;
  height: 40px;
`;

/**
 * @param {Provider} item
 * @return {JSX.Element}
 * @constructor
 */
export default function ProviderButton({ item }) {
  const languageAssets = item.display_settings.language_assets[0];
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (languageAssets.logo_url) {
      setPreview(languageAssets.logo_url);
    }
  }, [languageAssets]);

  return (
    <ProviderButtonContainer>
      {preview ? (
        <ProviderContainImage
          onError={() => setPreview(null)}
          preview={preview}
        />
      ) : (
        <Text variant="guiding-button">{languageAssets.display_name}</Text>
      )}
    </ProviderButtonContainer>
  );
}
