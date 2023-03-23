import styled from "styled-components/native";
import { Text } from "./Text";
import { Autolink } from "react-native-autolink";

const IntroMessage = styled.View`
  margin: 24px 0 51px;
  border: 1px solid #fff;
  padding: 12px;
`;

export default function IntroBlock({}) {
  const text = `This app was created by FlatPeak to enable you to quickly try the experience you can build for your customers with FlatPeak Connect.
 Written in react-native, it's free and includes libraries that will enable you to rapidly implement FlatPeak Connect. Clone from GitHub https://github.com/flat-peak/app-react-native.`;
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
