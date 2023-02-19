import contextReducer from "./contextReducer";
import providerSelectionReducer from "./providerSelectionReducer";
import tariffReducer from "./tariffReducer";
import keySetupReducer from "./keySetupReducer";
import inputDataReducer from "./inputDataReducer";
import outputDataReducer from "./outputDataReducer";
import progressIndicatorReducer from "./progressIndicatorReducer";

const reducers = {
  progress: progressIndicatorReducer,
  context: contextReducer,
  providerSelection: providerSelectionReducer,
  tariff: tariffReducer,
  keySetup: keySetupReducer,
  inputData: inputDataReducer,
  outputData: outputDataReducer,
};

export default reducers;
