import styled from "styled-components/native";
import { Text } from "./Text";
import { Autolink } from "react-native-autolink";

const IntroMessage = styled.View`
  margin: 24px 0 51px;
`;

export default function TariffWarningBlock({}) {
  const text =
    "NOTE: By submitting your details, you will be sharing them with Faraday&Future Inc. Your data will be stored and processed in strict compliance with GDPR. Review full privacy policy.";
  return (
    <IntroMessage>
      <Text variant={"intro"}>
        <Autolink
          text={text}
          linkStyle={{
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            textDecorationColor: "#fff",
          }}
        />
      </Text>
    </IntroMessage>
  );
}
