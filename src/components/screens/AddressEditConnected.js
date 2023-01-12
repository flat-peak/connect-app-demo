import { connect } from "react-redux";
import AddressEdit from "./AddressEdit";
import {
  selectAddress,
  setAddressField,
} from "../../store/reducers/inputDataReducer";
import { selectAreaEnabled } from "../../store/reducers/contextReducer";

const mapStateToProps = (state) => {
  return {
    address: selectAddress(state),
    area: selectAreaEnabled(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAddressField: (value) => dispatch(setAddressField(value)),
  };
};

export const AddressEditConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressEdit);

export default AddressEditConnected;
