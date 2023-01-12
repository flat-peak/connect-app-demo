import { connect } from "react-redux";
import TariffStructure from "./TariffStructure";
import {
  selectProvider,
  selectDisplayName,
  setStructure,
  setDisplayName,
  setExportEnabled,
  selectPlan,
  isTimeConfigurable,
  isSeasonConfigurable,
  findWeekdaySchedule,
} from "../../store/reducers/tariffReducer";

const mapStateToProps = (state) => {
  return {
    title: selectDisplayName(state),
    provider: selectProvider(state),
    plan: selectPlan(state),
    isTimeConfigurable: isTimeConfigurable,
    isSeasonConfigurable: isSeasonConfigurable,
    findWeekdaySchedule: findWeekdaySchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTitle: (value) => dispatch(setDisplayName(value)),
    setStructure: (value) => dispatch(setStructure(value)),
    setExportEnabled: (value) => dispatch(setExportEnabled(value)),
  };
};

export const TariffStructureConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TariffStructure);

export default TariffStructureConnected;
