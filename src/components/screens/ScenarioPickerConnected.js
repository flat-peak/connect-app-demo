import { connect } from "react-redux";
import ScenarioPicker from "./ScenarioPicker";
import { setInputData } from "../../store/reducers/inputDataReducer";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInputData: (value) => dispatch(setInputData(value)),
  };
};

export const ScenarioPickerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScenarioPicker);

export default ScenarioPickerConnected;
