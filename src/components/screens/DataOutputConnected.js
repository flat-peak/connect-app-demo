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

const mapStateToProps = (state) => {
  return {
    productId: selectProductId(state),
    tariffId: selectTariffId(state),
    customerId: selectCustomerId(state),
    deviceId: selectDeviceId(state),
    confirmed: selectConfirmed(state),
    developerMode: selectDeveloperMode(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOffPeakCharge: (value) => dispatch(setOffPeakCharge(value)),
  };
};

export const DataOutputConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataOutput);

export default DataOutputConnected;
