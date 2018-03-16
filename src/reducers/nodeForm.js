import * as ActionTypes from '../ActionTypes';

const initialState = {
  path: [],
  displayTitle: '',
  title: undefined,
  type: '',
  script: '',
};

const getDefaultScript = (type) => {
  switch (type) {
    case 'AJAX Request':
      return '// Generate the ajax request options from the previous transformation\'s ouput\nfunction generateRequestOptions (data) {\n  return {\n    url: "",\n    method: "GET",\n    findOptions: {}\n  };\n}\n\n// Generate some data to pass to the next transformation in the chain\n// You will be returning an array for map, filter, or reduce\nfunction generateOutput (data, ajaxResult) {\n  return [];\n}\n';
    case 'Map':
      return '// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map\n\nfunction myMapFn (doc) {\n  return doc;\n}\n';
    case 'Filter':
      return '// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter\n\nfunction myFilterFn (doc) {\n  return true;\n}\n';
    case 'Reduce':
      return '// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce\n\nconst initialValue = []; // This is the starting point for the reduce\nfunction myReducerFn (accumulator, currentValue) {\n  return accumulator.concat(currentValue);\n}\n';
    default:
      return '';
  }
};

export default function nodeForm (state=initialState, action) {
  switch (action.type) {
    case ActionTypes.RESET_NODE_FORM:
      return initialState;
    case ActionTypes.EDIT_NODE_FORM:
      return {
        ...state,
        ...action.payload.fieldsToMerge,
        script: getDefaultScript(action.payload.fieldsToMerge.type || '')
      };
    default:
      return state;
  }
}
