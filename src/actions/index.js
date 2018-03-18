import * as ActionTypes from '../ActionTypes';

export function loadInputData(data) {
  return {
    type: ActionTypes.LOAD_INPUT_DATA,
    payload: { data }
  };
}

export function resetInputForm() {
  return { type: ActionTypes.RESET_INPUT_FORM };
}

export function editInputForm(fieldsToMerge) {
  return {
    type: ActionTypes.EDIT_INPUT_FORM,
    payload: { fieldsToMerge }
  };
}

export function resetNodeForm() {
  return { type: ActionTypes.RESET_NODE_FORM };
}

export function editNodeForm(fieldsToMerge) {
  return {
    type: ActionTypes.EDIT_NODE_FORM,
    payload: { fieldsToMerge }
  };
}

export function swapTree(treeData) {
  return {
    type: ActionTypes.SWAP_TREE,
    payload: { treeData }
  };
}

export function swapNodeAtPath(newNode) {
  return {
    type: ActionTypes.SWAP_NODE_AT_PATH,
    payload: { path: newNode.path, newNode }
  };
}

export function removeNodeAtPath(path) {
  return {
    type: ActionTypes.REMOVE_NODE_AT_PATH,
    payload: { path }
  };
}

export function addNewNode() {
  return { type: ActionTypes.ADD_NEW_NODE };
}

export function runPipeline() {
  return { type: ActionTypes.RUN_PIPELINE };
}

export function startNode(nodeIndex) {
  return {
    type: ActionTypes.START_NODE,
    payload: { nodeIndex }
  };
}

export function evaluateNode(nodeIndex, input) {
  return {
    type: ActionTypes.EVALUATE_NODE,
    payload: { nodeIndex, input }
  };
}

export function finishNode(nodeIndex, output) {
  return {
    type: ActionTypes.FINISH_NODE,
    payload: { nodeIndex, output }
  };
}

export function finishPipeline(result) {
  return {
    type: ActionTypes.FINISH_PIPELINE,
    payload: { result }
  };
}

export function terminatePipeline(err, nodeIndex) {
  return {
    type: ActionTypes.TERMINATE_PIPELINE,
    payload: { err, nodeIndex }
  };
}
