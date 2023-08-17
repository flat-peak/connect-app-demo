import { Main, SafeScreen, Text, Wrapper } from "@app/shared/ui";
import { Link, Stack } from "expo-router";

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
