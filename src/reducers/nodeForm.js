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
      return `// Generate the ajax request's options from the previous transformation's ouput
function generateRequestOptions (input) {
  return {
    url: "", // [Required] the url of your request
    method: "GET", // [Required] the HTTP method of your request
    headers: {}, // [Optional] headers for a request, usually for tokens and content-type
    body: {}, // [Optional] the body of a POST or other request
    reponseType: 'json' // [Optional] the response type
  };
}

// Generate some data to pass to the next transformation
// You can use both the input and the response of the request
// You should be returning an array for map, filter, or reduce
function generateOutput (input, ajaxResult) {
  return [];
}
`;
    case 'Map':
      return `// See the MDN documentation at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// Your map function will be called on each element of
//  the array generated from the previous transformation
// In order to make a brand new array of the return values
function myMapFn (doc) {
  return doc;
}
`;
    case 'Filter':
      return `// See the MDN documentation at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

// Your filter function will be called on each element of
//  the array generated from the previous transformation
// In order to make a brand new array of the items with return values of true
function myFilterFn (doc) {
  return true;
}
`;
    case 'Reduce':
      return `// See the MDN documentation at:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

// Your reducer function wil be called on each element of
//  the array generated from the previous transformation
// In order to accumulate/aggregate it into a brand new javascript value
//  which will be seeded with an initial value

const initialValue = []; // This is the starting point for the reduce

function myReducerFn (accumulator, currentValue) {
  return accumulator.concat(currentValue);
}
`;
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
