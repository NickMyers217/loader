import * as ActionTypes from '../ActionTypes';

export function loadInputData (data) {
  return {
    type: ActionTypes.LOAD_INPUT_DATA,
    payload: {
      data
    }
  };
}

export function resetInputForm () {
  return {
    type: ActionTypes.RESET_INPUT_FORM
  };
}

export function editInputForm (fieldsToMerge) {
  return {
    type: ActionTypes.EDIT_INPUT_FORM,
    payload: {
      fieldsToMerge
    }
  };
}
