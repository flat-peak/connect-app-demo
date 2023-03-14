import { connect } from "react-redux";
import TariffSetup from "./TariffSetup";
import {
  selectPreferences,
  selectDisplayName,
  setDisplayName,
  setExportEnabled,
  selectExportEnabled,
} from "../../store/reducers/tariffReducer";

const mapStateToProps = (state) => {
  return {
    displayName: selectDisplayName(state),
    preferences: selectPreferences(state),
    exportEnabled: selectExportEnabled(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayName: (value) => dispatch(setDisplayName(value)),
    setExportEnabled: (value) => dispatch(setExportEnabled(value)),
  };
};

export const TariffSetupConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TariffSetup);

export default TariffSetupConnected;
