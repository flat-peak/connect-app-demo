import contextReducer from "./contextReducer";
import inputDataReducer from "./inputDataReducer";
import keySetupReducer from "./keySetupReducer";
import outputDataReducer from "./outputDataReducer";
import progressIndicatorReducer from "./progressIndicatorReducer";
import tariffReducer from "./tariffReducer";

const reducers = {
  progress: progressIndicatorReducer,
  context: contextReducer,
  tariff: tariffReducer,
  keySetup: keySetupReducer,
  inputData: inputDataReducer,
  outputData: outputDataReducer,
};

export default reducers;
