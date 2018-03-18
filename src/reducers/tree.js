import uuid from 'uuid/v4';
import * as R from 'ramda';
import {
  getVisibleNodeCount,
  changeNodeAtPath,
  removeNodeAtPath,
  getFlatDataFromTree
} from 'react-sortable-tree';

import * as ActionTypes from '../ActionTypes';

const initialState = {
  data: [],
  visibileCount: 0
};

const getNewNode = () => ({
  id: uuid(),
  displayTitle: '',
  title: 'Edit Me :(',
  children: []
});

const getNodeKey = ({ node }) => node.id;

const flattenTree = treeData =>
  getFlatDataFromTree({
    treeData,
    getNodeKey,
    ignoreCollapsed: false
  }).map(({ node }) => node);

const swapNodeInTree = treeData => newNode =>
  changeNodeAtPath({
    treeData,
    path: newNode.path,
    newNode,
    getNodeKey,
    ignoreCollapsed: false
  });

export default function tree(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SWAP_TREE:
      return {
        ...state,
        data: action.payload.treeData,
        visibleCount: getVisibleNodeCount({ treeData: action.payload.treeData })
      };
    case ActionTypes.SWAP_NODE_AT_PATH:
      return {
        ...state,
        data: swapNodeInTree(state.data)(action.payload.newNode)
      };
    case ActionTypes.REMOVE_NODE_AT_PATH:
      return {
        ...state,
        data: removeNodeAtPath({
          treeData: state.data,
          path: action.payload.path,
          getNodeKey
        }),
        visibileCount: state.visibileCount - 1
      };
    case ActionTypes.ADD_NEW_NODE:
      return {
        ...state,
        data: state.data.concat(getNewNode()),
        visibileCount: state.visibileCount + 1
      };
    case ActionTypes.RUN_PIPELINE:
      return { ...state, pipeline: flattenTree(state.data) };
    case ActionTypes.START_NODE: {
      const { nodeIndex } = action.payload;
      const currentNode = state.pipeline[nodeIndex];
      const newNode = {
        ...currentNode,
        startDate: new Date(),
        subtitle: 'Starting...'
      };
      return {
        ...state,
        pipeline: R.update(nodeIndex, newNode, state.pipeline),
        data: swapNodeInTree(state.data)(newNode)
      };
    }
    case ActionTypes.EVALUATE_NODE: {
      const { nodeIndex, input } = action.payload;
      const currentNode = state.pipeline[nodeIndex];
      const newNode = { ...currentNode, input, subtitle: 'Evaluating...' };
      return {
        ...state,
        pipeline: R.update(nodeIndex, newNode, state.pipeline),
        data: swapNodeInTree(state.data)(newNode)
      };
    }
    case ActionTypes.FINISH_NODE: {
      const { nodeIndex, output } = action.payload;
      const currentNode = state.pipeline[nodeIndex];
      const finishDate = new Date();
      const secondsElapsed = (finishDate - currentNode.startDate) / 1000;
      const newNode = {
        ...currentNode,
        output,
        finishDate,
        secondsElapsed,
        subtitle: `Finished in ${secondsElapsed.toFixed(2)}`
      };
      return {
        ...state,
        pipeline: R.update(nodeIndex, newNode, state.pipeline),
        data: swapNodeInTree(state.data)(newNode)
      };
    }
    case ActionTypes.FINISH_PIPELINE:
      return { ...state, result: action.payload.result };
    default:
      return state;
  }
}
