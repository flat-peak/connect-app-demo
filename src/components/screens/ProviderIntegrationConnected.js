import { connect } from "react-redux";
import ProviderIntegration from "./ProviderIntegration";
import { selectProvider } from "../../store/reducers/tariffReducer";
import { connectTariff } from "../../store/reducers/providerSelectionReducer";
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

const mapStateToProps = (state) => {
  return {
    provider: selectProvider(state),
    customerId: selectCustomerId(state),
    productId: selectProductId(state),
    error: selectError(state),
    loading: selectLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectTariff: (value) => dispatch(connectTariff(value)),
    setError: (value) => dispatch(setError(value)),
    dismissError: () => dispatch(dismissError()),
    setLoading: (value) => dispatch(setLoading(value)),
  };
};

export const ProviderIntegrationConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderIntegration);

export default ProviderIntegrationConnected;
