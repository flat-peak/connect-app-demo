import { connect } from "react-redux";
import {
  saveManualTariff,
  selectProvider,
  selectSaved,
  selectDisplayName,
  selectPlan,
  findWeekdaySchedule,
  saveConnectedTariff,
} from "../../store/reducers/tariffReducer";
import Summary from "./Summary";
import {
  dismissError,
  selectError,
  selectLoading,
} from "../../store/reducers/progressIndicatorReducer";

const mapStateToProps = (state) => {
  return {
    plan: selectPlan(state),
    findWeekdaySchedule: findWeekdaySchedule,
    title: selectDisplayName(state),
    saved: selectSaved(state),
    provider: selectProvider(state),
    error: selectError(state),
    loading: selectLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveManualTariff: () => dispatch(saveManualTariff()),
    saveConnectedTariff: () => dispatch(saveConnectedTariff()),
    dismissError: () => dispatch(dismissError()),
  };
};

export const SummaryConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);

export default SummaryConnected;
