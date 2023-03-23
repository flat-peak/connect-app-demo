import { connect } from "react-redux";
import DataOutput from "./DataOutput";
import {
  selectCustomerId,
  selectConfirmed,
  selectDeviceId,
  selectProductId,
  selectTariffId,
} from "../../store/reducers/outputDataReducer";
import {
  selectDeveloperMode,
  setOffPeakCharge,
} from "../../store/reducers/contextReducer";
import { initDeveloperSession } from "../../store/reducers/inputDataReducer";
import { selectDashboardUrl } from "../../store/reducers/keySetupReducer";
const mapStateToProps = (state) => {
  return {
    productId: selectProductId(state),
    tariffId: selectTariffId(state),
    customerId: selectCustomerId(state),
    deviceId: selectDeviceId(state),
    confirmed: selectConfirmed(state),
    developerMode: selectDeveloperMode(state),
    dashboardUrl: selectDashboardUrl(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOffPeakCharge: (value) => dispatch(setOffPeakCharge(value)),
    initDeveloperSession: (value) => dispatch(initDeveloperSession(value)),
  };
};

export const DataOutputConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataOutput);

export default DataOutputConnected;
