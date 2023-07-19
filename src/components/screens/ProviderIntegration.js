import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { View } from "react-native";
import WebView from "react-native-webview";
import LoaderDialog from "../dialogs/loader-dialog";
import ErrorDialog from "../dialogs/error-dialog";
import { selectPublishableKey } from "../../store/reducers/keySetupReducer";
import {
  connectTariff,
  selectProvider,
} from "../../store/reducers/tariffReducer";
import {
  selectCustomerId,
  selectProductId,
} from "../../store/reducers/inputDataReducer";
import {
  dismissError,
  selectError,
  selectLoading,
  setError,
  setLoading,
} from "../../store/reducers/progressIndicatorReducer";
import { useDispatch, useSelector } from "react-redux";
import { TARIFF_SIDE } from "../../data/tariff-constants";

export default function ProviderIntegration({ navigation }) {
  const publishableKey = useSelector(selectPublishableKey);
  const provider = useSelector(selectProvider);
  const customerId = useSelector(selectCustomerId);
  const productId = useSelector(selectProductId);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  if (!provider) {
    return null;
  }

  const uri = provider?.integration_settings?.onboard_url;

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
        if (response.object === "action") {
          switch (response.type) {
            case "SWITCH_TO_MANUAL_FLOW":
              navigation.push("TariffStructure", {
                side: TARIFF_SIDE.IMPORT,
              });
              break;
            default:
              dispatch(
                setError({
                  visible: true,
                  title: "Integration error",
                  message: "Unknown action type:" + response.type,
                  critical: true,
                })
              );
              break;
          }
        } else if (response.object === "error") {
          dispatch(
            setError({
              visible: true,
              title:
                response.type === "api_error" ? "Error.API" : response.type,
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
      <View style={{ flex: 1 }}>
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

        <WebView
          style={{ backgroundColor: theme.colors.background }}
          source={{
            uri,
            headers: {
              "publishable-key": publishableKey,
              "product-id": productId,
              "customer-id": customerId,
              "provider-id": provider.id,
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
              window.respondToApp = (r) => window.ReactNativeWebView.postMessage(
                typeof r === 'string' ? r : JSON.stringify(r)
              );
              true;
            `}
        />
      </View>
    </ThemeProvider>
  );
}
