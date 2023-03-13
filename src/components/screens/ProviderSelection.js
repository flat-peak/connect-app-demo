import Header from "../layout/Header";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import ProviderButton from "../common/ProviderButton";
import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { ScreenView } from "../layout/View";
import Wrapper from "../layout/Wrapper";
import Main from "../layout/Main";
import styled from "styled-components/native";
import { TextInput } from "../form-controls/TextInput";
import { isConnectableProvider } from "../../global/common";

const ProvidersContainer = styled.View`
  flex: 1;
  margin-top: 20px;
`;

export default function ProviderSelection({
  navigation,
  fetchProviderList,
  providers,
  loading,
  setProvider,
  country_code,
}) {
  const [keyword, setState] = useState("");

  useEffect(() => {
    fetchProviderList({ keyword, countryCode: country_code });
  }, [fetchProviderList, keyword, country_code]);

  return (
    <ThemeProvider theme={theme}>
      <ScreenView>
        <Header
          title={"Select your provider"}
          subTitle={"I.e. your current electricity supplier."}
        />
        <Wrapper>
          <Main>
            <View>
              <TextInput
                placeholder={"Search"}
                placeholderTextColor="#aeacac"
                onChangeText={setState}
                value={keyword}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <ProvidersContainer>
              <FlatList
                data={loading ? [] : providers}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setProvider(item);
                      if (isConnectableProvider(item)) {
                        navigation.push("ProviderIntegration");
                      } else {
                        navigation.push("TariffSetup");
                      }
                    }}
                  >
                    <ProviderButton item={item} />
                  </TouchableOpacity>
                )}
              />
            </ProvidersContainer>
          </Main>
        </Wrapper>
      </ScreenView>
    </ThemeProvider>
  );
}
