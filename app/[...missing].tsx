import { Link, Stack } from "expo-router";
import Main from "../shared/ui/layout/Main";
import Wrapper from "../shared/ui/layout/Wrapper";
import SafeScreen from "../shared/ui/layout/Screen";
import { Text } from "../shared/ui/Text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeScreen>
        <Wrapper>
          <Main>
            <Text variant={"heading"}>This screen doesn't exist.</Text>
            <Link href="/">
              <Text variant={"body"}>Go to home screen!</Text>
            </Link>
          </Main>
        </Wrapper>
      </SafeScreen>
    </>
  );
}
