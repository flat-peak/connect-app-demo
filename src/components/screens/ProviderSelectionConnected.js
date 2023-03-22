import { connect } from "react-redux";
import ProviderSelection from "./ProviderSelection";
import {
  fetchProviderList,
  selectLoading,
  selectProviders,
} from "../../store/reducers/providerSelectionReducer";
import { setProvider } from "../../store/reducers/tariffReducer";
import { selectCountry } from "../../store/reducers/inputDataReducer";

const mapStateToProps = (state) => {
  return {
    loading: selectLoading(state),
    providers: selectProviders(state),
    country_code: selectCountry(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProviderList: (value) => dispatch(fetchProviderList(value)),
    setProvider: (value) => dispatch(setProvider(value)),
  };
};

export const ProviderSelectionConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderSelection);

export default ProviderSelectionConnected;
