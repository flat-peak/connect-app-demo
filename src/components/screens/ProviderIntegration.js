import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { View } from "react-native";
import WebView from "react-native-webview";
import LoaderDialog from "../dialogs/loader-dialog";
import ErrorDialog from "../dialogs/error-dialog";
import {
  selectIntegrationUrl,
  selectPublishableKey,
} from "../../store/reducers/keySetupReducer";
import {
  connectTariff,
  selectProvider,
} from "../../store/reducers/tariffReducer";
import {
  selectAddress,
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
import { useCallback, useMemo, useRef } from "react";
const Buffer = global.Buffer || require("buffer").Buffer;

export default function ProviderIntegration({ navigation }) {
  const publishableKey = useSelector(selectPublishableKey);
  const customerId = useSelector(selectCustomerId);
  const productId = useSelector(selectProductId);
  const postalAddress = useSelector(selectAddress);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const integrationUrl = useSelector(selectIntegrationUrl);
  const dispatch = useDispatch();
  const sharedState = useRef(
    Buffer.from(
      JSON.stringify({
        product_id: productId,
        customer_id: customerId,
        postal_address: postalAddress,
        // TODO: connect
        // geo_location: [-0.12657891596975313, 51.50786600382782],
      })
    ).toString("base64")
  );

  const onMessage = useCallback(
    (event) => {
      if (!event.nativeEvent.data) {
        return;
      }
      const message = event.nativeEvent.data;

      try {
        const response = JSON.parse(message);
        switch (response.object) {
          case "success": {
            const state = JSON.parse(
              Buffer.from(response.state, "base64").toString("utf8")
            );
            dispatch(connectTariff(state)).then((actionResult) => {
              if (connectTariff.fulfilled.match(actionResult)) {
                navigation.replace("Summary");
              }
            });
            break;
          }
          case "action": {
            switch (response.type) {
              case "SWITCH_TO_MANUAL_FLOW":
                const isAuto = response.params?.mode === "auto";
                if (isAuto) {
                  navigation.replace("TariffStructure", {
                    side: TARIFF_SIDE.IMPORT,
                  });
                } else {
                  navigation.push("TariffStructure", {
                    side: TARIFF_SIDE.IMPORT,
                  });
                }
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
            break;
          }
          case "error": {
            dispatch(
              setError({
                visible: true,
                title:
                  response.type === "api_error" ? "Error.API" : response.type,
                message: response.message,
                critical: response.critical,
              })
            );
            break;
          }
          default: {
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
    },
    [dispatch, navigation]
  );

  const onLoadStart = useCallback(() => {
    dispatch(setLoading(true));
  }, [dispatch]);

  const onLoadEnd = useCallback(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  const ConnectWebView = useMemo(() => {
    const auth = `${Buffer.from(publishableKey + ":").toString("base64")}`;

    return (
      <WebView
        style={{ backgroundColor: theme.colors.background }}
        source={{
          uri: integrationUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth,
            state: sharedState.current,
          }),
        }}
        cacheEnabled={false}
        cacheMode={"LOAD_NO_CACHE"}
        incognito={true}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onMessage={onMessage}
        injectedJavaScript={`
              window.respondToApp = (r) => window.ReactNativeWebView.postMessage(
                typeof r === 'string' ? r : JSON.stringify(r)
              );
              true;
            `}
      />
    );
  }, [integrationUrl, onLoadEnd, onLoadStart, onMessage, publishableKey]);

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
        {ConnectWebView}
      </View>
    </ThemeProvider>
  );
}
