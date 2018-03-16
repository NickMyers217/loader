import { combineReducers } from 'redux';

import input from './input';
import tree from './tree';
import inputForm from './inputForm';
import nodeForm from './nodeForm';

export default combineReducers({
  input,
  tree,
  inputForm,
  nodeForm
});
