import { connect } from "react-redux";
import DataInput from "./DataInput";
import {
  initInputParams,
  selectMacAddress,
  selectCustomerId,
  selectDeviceId,
  selectProductId,
  selectTimezone,
  setInputParam,
} from "../../store/reducers/inputDataReducer";
import {
  selectError,
  selectLoading,
  dismissError,
} from "../../store/reducers/progressIndicatorReducer";

const mapStateToProps = (state) => {
  return {
    macAddress: selectMacAddress(state),
    customerId: selectCustomerId(state),
    productId: selectProductId(state),
    deviceId: selectDeviceId(state),
    timezone: selectTimezone(state),
    loading: selectLoading(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initInputParams: (value) => dispatch(initInputParams(value)),
    setInputParam: (value) => dispatch(setInputParam(value)),
    dismissError: () => dispatch(dismissError()),
  };
};

export const DataInputConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataInput);

export default DataInputConnected;
