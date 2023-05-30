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
import {
  fetchProviderList,
  selectLoading,
  selectProviders,
} from "../../store/reducers/providerSelectionReducer";
import { selectCountry } from "../../store/reducers/inputDataReducer";
import { useDispatch, useSelector } from "react-redux";
import { setProvider } from "../../store/reducers/tariffReducer";

const ProvidersContainer = styled.View`
  flex: 1;
  margin-top: 20px;
`;

export default function ProviderSelection({ navigation }) {
  const loading = useSelector(selectLoading);
  const providers = useSelector(selectProviders);
  const country_code = useSelector(selectCountry);
  const dispatch = useDispatch();
  const [keyword, setState] = useState("");

  useEffect(() => {
    dispatch(fetchProviderList({ keyword, countryCode: country_code }));
  }, [keyword, country_code, dispatch]);

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
                      dispatch(setProvider(item));
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
