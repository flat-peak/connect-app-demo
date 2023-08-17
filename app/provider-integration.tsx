import { useDispatch, useSelector } from "react-redux";
import {
  selectIntegrationUrl,
  selectPublishableKey,
} from "../global/store/reducers/keySetupReducer";
import {
  selectAddress,
  selectCustomerId,
  selectMacAddress,
  selectProductId,
  selectTimezone,
} from "../global/store/reducers/inputDataReducer";

import { useCallback, useMemo, useRef, useState } from "react";
import { setOutputData } from "../global/store/reducers/outputDataReducer";
import WebView from "react-native-webview";
import { useRouter } from "expo-router";
import { useTheme } from "styled-components";
import Header from "../widgets/header/Header";
import LoaderDialog from "../widgets/loader/loader-dialog";
import ErrorDialog from "../widgets/error-notifier/error-dialog";
import Main from "../shared/ui/layout/Main";

const Buffer = global.Buffer || require("buffer").Buffer;

export default function ProviderIntegration() {
  const publishableKey = useSelector(selectPublishableKey);
  const customerId = useSelector(selectCustomerId);
  const productId = useSelector(selectProductId);
  const postalAddress = useSelector(selectAddress);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    visible: false,
    title: "",
    message: "",
    critical: false,
  });

  const timezone = useSelector(selectTimezone);
  const macAddress = useSelector(selectMacAddress);
  const integrationUrl = useSelector(selectIntegrationUrl);
  const dispatch = useDispatch();
  const router = useRouter();
  const webViewRef = useRef<WebView>();
  const [webViewcanGoBack, setWebViewcanGoBack] = useState(false);

  // webViewRef.current.goBack();
  const theme = useTheme();
  const sharedState = useRef(
    Buffer.from(
      JSON.stringify({
        product_id: productId,
        customer_id: customerId,
        postal_address: postalAddress,
        timezone: timezone,
        devices: [{ mac: macAddress, reference_id: "" }],
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
            const { device_id, customer_id, product_id, tariff_id } = state;
            dispatch(
              setOutputData({ device_id, customer_id, product_id, tariff_id })
            );
            router.replace("data-output");
            break;
          }
          case "error": {
            setError({
              visible: true,
              title:
                response.type === "api_error" ? "Error.API" : response.type,
              message: response.message,
              critical: response.critical,
            });
            break;
          }
          default: {
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
    },
    [dispatch, router]
  );

  const onLoadStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const ConnectWebView = useMemo(() => {
    const auth = `${Buffer.from(publishableKey + ":").toString("base64")}`;

    return (
      <WebView
        ref={webViewRef}
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
        incognito={true}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onMessage={onMessage}
        onLoadProgress={({ nativeEvent }) => {
          setWebViewcanGoBack(nativeEvent.canGoBack);
        }}
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
    <Main>
      <Header
        title={"Connect"}
        useNav={true}
        inModal={true}
        goBackHandler={
          webViewcanGoBack ? () => webViewRef.current.goBack() : undefined
        }
      />

      {ConnectWebView}

      <LoaderDialog visible={loading} />
      <ErrorDialog
        isVisible={error.visible}
        title={error.title}
        message={error.message}
        onDismiss={() => setError({ ...error, visible: false })}
      />
    </Main>
  );
}
