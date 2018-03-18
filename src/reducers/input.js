import * as ActionTypes from '../ActionTypes';

export default function(state = [], action) {
  switch (action.type) {
    case ActionTypes.LOAD_INPUT_DATA:
      return action.payload.data;
    default:
      return state;
  }
}
