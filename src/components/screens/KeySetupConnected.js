import { connect } from "react-redux";

import KeySetup from "./KeySetup";
import {
  checkApiCredentials,
  selectApiUrl,
  selectPublishableKey,
  setApiUrl,
  setPublishableKey,
} from "../../store/reducers/keySetupReducer";
import {
  dismissError,
  selectError,
  selectLoading,
} from "../../store/reducers/progressIndicatorReducer";

const mapStateToProps = (state) => {
  return {
    apiUrl: selectApiUrl(state),
    publishableKey: selectPublishableKey(state),
    loading: selectLoading(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPublishableKey: (value) => dispatch(setPublishableKey(value)),
    setApiUrl: (value) => dispatch(setApiUrl(value)),
    checkApiCredentials: (value) => dispatch(checkApiCredentials(value)),
    dismissError: () => dispatch(dismissError()),
  };
};

export const KeySetupConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeySetup);

export default KeySetupConnected;
