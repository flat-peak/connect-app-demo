import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { ScreenSafeView } from "../layout/View";
import { View } from "react-native";
import WebView from "react-native-webview";
import LoaderDialog from "../dialogs/loader-dialog";
import ErrorDialog from "../dialogs/error-dialog";
import { selectPublishableKey } from "../../store/reducers/keySetupReducer";
import { connectTariff, selectProvider } from "../../store/reducers/tariffReducer";
import { selectCustomerId, selectProductId } from "../../store/reducers/inputDataReducer";
import {
  dismissError,
  selectError,
  selectLoading,
  setError,
  setLoading,
} from "../../store/reducers/progressIndicatorReducer";
import { useDispatch, useSelector } from "react-redux";

export default function ProviderIntegration({ navigation }) {
  const publishableKey = useSelector(selectPublishableKey);
  const provider = useSelector(selectProvider);
  const customerId = useSelector(selectCustomerId);
  const productId = useSelector(selectProductId);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const uri = provider.integration_settings.onboard_url;

  const onResponse = (message) => {
    try {
      const response = JSON.parse(message);
      if (response.hasOwnProperty("tariff_id")) {
        dispatch(connectTariff(response)).then((actionResult) => {
          if (connectTariff.fulfilled.match(actionResult)) {
            navigation.push("Summary");
          }
        });
      } else {
        if (response.object === "error") {
          dispatch(
            setError({
              visible: true,
              title:
                response.type === "api_error" ? "API error" : response.type,
              message: response.message,
              critical: response.critical,
            })
          );
        } else if (response.object === "loading") {
          dispatch(setLoading(response.type === "loading_start"));
        } else {
          dispatch(
            setError({
              visible: true,
              title: "Integration failed",
              message: response.message || "Unknown error",
              critical: true,
            })
          );
        }
      }
    } catch (e) {
      dispatch(
        setError({
          visible: true,
          title: "Integration failed",
          message: e.message || "Unknown error",
          critical: true,
        })
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <LoaderDialog visible={loading} />
        <ErrorDialog
          isVisible={error.visible}
          title={error.title}
          message={error.message}
          onDismiss={() => {
            if (error.critical) {
              navigation.goBack();
            }
            dispatch(dismissError());
          }}
        />
        <View style={{ flex: 1 }}>
          <WebView
            style={{ backgroundColor: theme.colors.background }}
            source={{
              uri,
              headers: {
                "publishable-key": publishableKey,
                "product-id": productId,
                "customer-id": customerId,
              },
            }}
            cacheEnabled={false}
            cacheMode={"LOAD_NO_CACHE"}
            incognito={true}
            onLoadStart={() => dispatch(setLoading(true))}
            onLoadEnd={() => dispatch(setLoading(false))}
            onMessage={(event) => {
              if (event.nativeEvent.data) {
                onResponse(event.nativeEvent.data);
              }
            }}
            injectedJavaScript={`
              document.body.style.setProperty("--fp-theme-background", "${theme.colors.background}");
              window.respondToApp = (r) => window.ReactNativeWebView.postMessage(
                typeof r === 'string' ? r : JSON.stringify(r)
              );
              true;
            `}
          />
        </View>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
