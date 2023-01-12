import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { ScreenSafeView } from "../layout/View";
import { View } from "react-native";
import WebView from "react-native-webview";
import { API_PUBLISHABLE_KEY } from "@env";
import LoaderDialog from "../dialogs/loader-dialog";
import ErrorDialog from "../dialogs/error-dialog";

/**
 * @param {Object} navigation
 * @param {Provider} provider
 * @param {Function} connectTariff
 * @param {string} productId
 * @param {string} customerId
 * @param {boolean} loading
 * @param {object} error
 * @param {Function} dismissError
 * @param {Function} setError
 * @param {Function} setLoading
 * @return {JSX.Element}
 * @constructor
 */
export default function ProviderIntegration({
  provider,
  connectTariff,
  navigation,
  productId,
  customerId,
  loading,
  error,
  dismissError,
  setError,
  setLoading,
}) {
  const uri = provider.integration_settings.onboard_url;
  const runFirst = `
      document.body.style.setProperty("--fp-theme-background", "${theme.colors.background}");
      window.FLATPEAK_PUBLISHABLE_KEY = "${API_PUBLISHABLE_KEY}";
      window.FLATPEAK_PRODUCT_ID = "${productId}";
      window.FLATPEAK_CUSTOMER_ID = "${customerId}";
      window.respondToApp = (r) => window.ReactNativeWebView.postMessage(
        typeof r === 'string' ? r : JSON.stringify(r)
      );
      true;
    `;

  const onResponse = (message) => {
    try {
      const response = JSON.parse(message);
      if (response.hasOwnProperty("tariff_id")) {
        connectTariff(response);
      } else {
        if (response.object === "error") {
          setError({
            visible: true,
            title: response.type === "api_error" ? "API error" : response.type,
            message: response.message,
            critical: response.critical,
          });
        } else if (response.object === "loading") {
          setLoading(response.type === "loading_start");
        } else {
          setError({
            visible: true,
            title: "Integration failed",
            message: response.message || "Unknown error",
            critical: true,
          });
        }
      }
    } catch (e) {
      setError({
        visible: true,
        title: "Integration failed",
        message: e.message || "Unknown error",
        critical: true,
      });
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
            dismissError();
          }}
        />
        <View style={{ flex: 1 }}>
          <WebView
            style={{ backgroundColor: theme.colors.background }}
            source={{
              uri,
              headers: {
                "publishable-key": API_PUBLISHABLE_KEY,
                "product-id": productId,
                "customer-id": customerId,
              },
            }}
            cacheEnabled={false}
            cacheMode={"LOAD_NO_CACHE"}
            incognito={true}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onMessage={(event) => {
              if (event.nativeEvent.data) {
                onResponse(event.nativeEvent.data);
              }
            }}
            injectedJavaScript={runFirst}
          />
        </View>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
