import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { selectProvider } from "../../store/reducers/tariffReducer";
import { WebTextInput } from "../form-controls/WebTextInput";
import Button from "../form-controls/Button";

const FormWrapper = styled.View`
  margin: 20px 0 40px;
`;

const TariffNameFormContainer = styled.View`
  margin: 8px 0 0;
  border: 1px solid #666666;
  padding: 14px 14px 40px;
  border-radius: 10px;
`;
const ProviderWrapper = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ProviderLogoContainer = styled.Image.attrs(({ preview }) => ({
  resizeMode: "contain",
  source: {
    uri: preview,
  },
}))`
  width: 215px;
  height: 72px;
`;

export default function TariffNameForm({
  value,
  onChangeText,
  onProceed,
  onCancel,
}) {
  const provider = useSelector(selectProvider);
  return (
    <TariffNameFormContainer>
      <ProviderWrapper>
        <ProviderLogoContainer
          preview={provider?.display_settings?.language_assets[0]?.logo_url}
        />
      </ProviderWrapper>

      <FormWrapper>
        <WebTextInput value={value} onChangeText={onChangeText} />
      </FormWrapper>

      <Button
        variant="executive"
        size={"small"}
        title={"Submit"}
        onPress={onProceed}
      />

      <Button variant="destructive" title={"Go back"} onPress={onCancel} />
    </TariffNameFormContainer>
  );
}
