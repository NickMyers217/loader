import * as ActionTypes from '../ActionTypes';

const initialState = {
  startDataFromFile: true,
  jsonText: '',
  chosenFile: '',
  loadError: null,
};

export default function inputForm (state=initialState, action) {
  switch (action.type) {
    case ActionTypes.RESET_INPUT_FORM:
      return { ...initialState, jsonText: state.jsonText }
    case ActionTypes.EDIT_INPUT_FORM:
      return { ...state, ...action.payload.fieldsToMerge }
    default:
      return state;
  }
}
