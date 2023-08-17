import { TextInput } from "@app/shared/ui/TextInput";
import styled from "styled-components";

const InputValue = styled(TextInput).attrs(({ refs, refIndex }) => {
  return {
    autoCapitalize: "none",
    autoCorrect: false,
    ref: refs[refIndex],
    ...(refIndex < refs.length - 1
      ? {
          returnKeyType: "next",
          onSubmitEditing: () => refs[refIndex + 1].current.focus(),
        }
      : {}),
  };
})`
  border-radius: 10px;
`;

export default InputValue;
