import styled from "styled-components/native";
import { Text } from "./Text";
import { Autolink } from "react-native-autolink";

const IntroMessage = styled.View`
  margin: 24px 0 51px;
  border: 1px solid #fff;
  padding: 12px;
`;

export default function IntroBlock({}) {
  const text = `This example react-native app was created by FlatPeak to enable developers and product owners to evaluate consumer experience they can build with FlatPeak.
 This app is open-sourced and is available from GitHub - https://github.com/flat-peak.`;
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
