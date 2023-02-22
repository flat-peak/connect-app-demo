import styled from "styled-components/native";
import { Text } from "./Text";
import { Autolink } from "react-native-autolink";

const IntroMessage = styled.View`
  margin: 24px 0 51px;
  border: 1px solid #fff;
  padding: 12px;
`;

export default function IntroBlock({ }) {
  const text = `This example react-native app should not be used in production. It was developed by FlatPeak to enable our business customers to evaluate consumer experience they can build.

App is open-sourced, clone it from GitHub: https://github.com/flat-peak/app-react-native..

To get API keys, and for support sign up or login to Dashboard: https://dashboard.flatpeak.energy.`;
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
