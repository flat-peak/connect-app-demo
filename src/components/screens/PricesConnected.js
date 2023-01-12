import { connect } from "react-redux";
import {
  addPriceRange,
  findWeekdaySchedule,
  isTimeConfigurable,
  removePriceRange,
  selectPlan,
  selectPreferences,
  setPrice,
  setSamePrices,
} from "../../store/reducers/tariffReducer";
import Prices from "./Prices";

const mapStateToProps = (state) => {
  return {
    plan: selectPlan(state),
    findWeekdaySchedule: findWeekdaySchedule,
    isTimeConfigurable: isTimeConfigurable,
    preferences: selectPreferences(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPriceRange: (payload) => dispatch(addPriceRange(payload)),
    removePriceRange: (payload) => dispatch(removePriceRange(payload)),
    setPrice: (payload) => dispatch(setPrice(payload)),
    setSamePrices: (payload) => dispatch(setSamePrices(payload)),
  };
};

export const PricesConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices);

export default PricesConnected;
