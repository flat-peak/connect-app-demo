import { connect } from "react-redux";
import {
  selectAreaEnabled,
  selectOffPeakCharge,
  setOffPeakCharge,
} from "../../store/reducers/contextReducer";
import Home from "./Home";
import {
  initDefaultSession,
  initDeveloperSession,
  selectCountry,
  setCountry,
} from "../../store/reducers/inputDataReducer";
import {
  dismissError,
  selectError,
} from "../../store/reducers/progressIndicatorReducer";
import { selectLoading } from "../../store/reducers/providerSelectionReducer";

const mapStateToProps = (state) => {
  return {
    offPeakCharge: selectOffPeakCharge(state),
    loading: selectLoading(state),
    error: selectError(state),
    country: selectCountry(state),
    area: selectAreaEnabled(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initDefaultSession: (value) => dispatch(initDefaultSession(value)),
    initDeveloperSession: (value) => dispatch(initDeveloperSession(value)),
    dismissError: () => dispatch(dismissError()),
    setOffPeakCharge: (value) => dispatch(setOffPeakCharge(value)),
    setCountry: (value) => dispatch(setCountry(value)),
  };
};

export const ScheduleConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default ScheduleConnected;
