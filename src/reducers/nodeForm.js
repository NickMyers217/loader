import React from 'react';

import * as ActionTypes from '../ActionTypes';

const initialState = {
  path: [],
  displayTitle: '',
  title: undefined,
  type: '',
  docs: '',
  script: ''
};

const getDocs = type => {
  switch (type) {
    case 'Map':
      return (
        <span>
          See the MDN for Array.prototype.map{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
            target="_blank"
          >
            here
          </a>
        </span>
      );
    case 'Filter':
      return (
        <span>
          See the MDN for Array.prototype.filter{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"
            target="_blank"
          >
            here
          </a>
        </span>
      );
    case 'Reduce':
      return (
        <span>
          See the MDN for Array.prototype.reduce{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce"
            target="_blank"
          >
            here
          </a>
        </span>
      );
    default:
      return '';
  }
};

const getDefaultScript = type => {
  switch (type) {
    case 'Map':
      return `\
// Your map function will be called on each element of
// the array generated from the previous transformation
// In order to make a brand new array of the return values
function myMapFn (doc) {
  return doc;
}
`;
    case 'Filter':
      return `\
// Your filter function will be called on each element of
// the array generated from the previous transformation
// In order to make a brand new array of the items with return values of true
function myFilterFn (doc) {
  return true;
}
`;
    case 'Reduce':
      return `\
// Your reducer function wil be called on each element of
// the array generated from the previous transformation
// In order to accumulate/aggregate it into a brand new javascript value
// which will be seeded with an initial value

(() => ({
  // This returns the starting point for the reduce
  generateInitialValue: function (input) {
    return [];
  },

  myReducerFn: function (accumulator, currentValue) {
    return accumulator.concat(currentValue);
  }
}))()
`;
    case 'AJAX Request':
      return `\
(() => ({
  // Generate the ajax options from the previous transformation's ouput
  generateRequestOptions: function (input) {
    return {
      url: "",            // [Required] the url of your request
      method: "GET",      // [Required] the HTTP method of your request
      headers: {},        // [Optional] headers for the request
      body: {},           // [Optional] the body of a POST or other request
      reponseType: 'json' // [Optional] the response type you expect
    };
  },

  // Generate some data to pass to the next transformation
  // You can use both the input and the response of the request
  // You should be returning an array for an upcomping map, filter, or reduce
  // Otherwise you can do anything (helpful to chain multiple requests and gather results)
  generateOutput: function (input, ajaxResult) {
    return [];
  }
}))()
`;
    default:
      return '';
  }
};

export default function nodeForm(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RESET_NODE_FORM:
      return initialState;
    case ActionTypes.EDIT_NODE_FORM:
      let { type, id } = action.payload.fieldsToMerge;
      // Reset the script to the default if we are doing a type change with no id
      return type === undefined || id
        ? { ...state, ...action.payload.fieldsToMerge }
        : {
            ...state,
            ...action.payload.fieldsToMerge,
            docs: getDocs(type),
            script: getDefaultScript(type)
          };
    default:
      return state;
  }
}
