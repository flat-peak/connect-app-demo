import contextReducer from "./contextReducer";
import tariffReducer from "./tariffReducer";
import keySetupReducer from "./keySetupReducer";
import inputDataReducer from "./inputDataReducer";
import outputDataReducer from "./outputDataReducer";
import progressIndicatorReducer from "./progressIndicatorReducer";

const reducers = {
  progress: progressIndicatorReducer,
  context: contextReducer,
  tariff: tariffReducer,
  keySetup: keySetupReducer,
  inputData: inputDataReducer,
  outputData: outputDataReducer,
};

export default reducers;
