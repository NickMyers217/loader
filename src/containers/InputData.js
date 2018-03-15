import { connect } from 'react-redux';

import { loadInputData, resetInputForm, editInputForm } from '../actions';
import InputData from '../components/InputData';

const mapStateToProps = ({ input, inputForm }) => ({ input, inputForm });
const mapDispatchToProps = { loadInputData, resetInputForm, editInputForm };

export default connect(mapStateToProps, mapDispatchToProps)(InputData);
