import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Text } from "./Text";
import { Autolink } from "react-native-autolink";

const IntroMessage = styled.View`
  margin: 24px 0 51px;
  border: 1px solid #fff;
  padding: 12px;
`;

export default function IntroBlock({}) {
  const text = `This example react-native application is developed by FlatPeak to enable developers and product owners to evaluate consumer experience they can build with FlatPeak API and SDKs.
 Email support@flatpeak.energy to request access to application source code.`;
  return (
    <IntroMessage>
      <Text variant={"intro"}>
        <Autolink text={text} linkStyle={styles.link} />
      </Text>
    </IntroMessage>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#fff",
  },
});
