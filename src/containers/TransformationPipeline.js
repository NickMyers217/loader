import { connect } from 'react-redux';

import {
  addNewNode,
  swapTree,
  swapNodeAtPath,
  removeNodeAtPath,
  resetNodeForm,
  editNodeForm
} from '../actions';
import TransformationPipeline from '../components/TransformationPipeline';

const mapStateToProps = ({ nodeForm, tree }) => ({ nodeForm, tree });
const mapDispatchToProps = {
  addNewNode,
  swapTree,
  swapNodeAtPath,
  removeNodeAtPath,
  resetNodeForm,
  editNodeForm
};

export default connect(mapStateToProps, mapDispatchToProps)(TransformationPipeline);
