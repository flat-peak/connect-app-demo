import { connect } from "react-redux";
import Seasons from "./Seasons";
import {
  addSeasonRange,
  findWeekdaySchedule,
  removeSeasonRange,
  selectPlan,
  setSeasonRange,
} from "../../store/reducers/tariffReducer";

const mapStateToProps = (state) => {
  return {
    plan: selectPlan(state),
    findWeekdaySchedule: findWeekdaySchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSeasonRange: (payload) => dispatch(setSeasonRange(payload)),
    addSeasonRange: (payload) => dispatch(addSeasonRange(payload)),
    removeSeasonRange: (payload) => dispatch(removeSeasonRange(payload)),
  };
};

export const SeasonsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Seasons);

export default SeasonsConnected;
