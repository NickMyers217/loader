import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import * as ActionTypes from '../ActionTypes';
import { startNode, evaluateNode, finishNode, finishPipeline, terminatePipeline } from '../actions';

export function runPipelineEpic (action$, store) {
  return action$
    .ofType(ActionTypes.RUN_PIPELINE)
    .switchMap(() => {
      const input = store.getState().input;
      const pipeline = store.getState().tree.pipeline;
      return pipeline.length > 0
        ? Observable
          .concat([ startNode(0), evaluateNode(0, input) ])
          .catch(terminatePipeline)
        : Observable.of(finishPipeline(input));
    });
}

export function evaluateNodeEpic (action$, store) {
  const evalNode = (node, input) => {
    if (node.type === 'MAP') {
      return Observable.of(input.map(eval(`(${node.script})`)));
    }
    if (node.type === 'FILTER') {
      return Observable.of(input.filter(eval(`(${node.script})`)));
    }
    if (node.type === 'REDUCE') {
      const { getInitialValueFn, myReducerFn } = eval(`(${node.script})`);
      return Observable.of(input.reduce(myReducerFn, getInitialValueFn(input)));
    }
    if (node.type === 'AJAX REQUEST') {
      // TODO: batching goes here
      const { generateRequestOptsFn, generateOutputFn } = eval(`(${node.script})`);
      return ajax(generateRequestOptsFn(input))
        .map(e => e.response);
    }
  };

  return action$
  .ofType(ActionTypes.EVALUATE_NODE)
  .switchMap(({ payload: { nodeIndex, input } }) => {
    const node = store.getState().tree.pipeline[nodeIndex];
    const output$ = evalNode(node, input);
    return output$
      .switchMap(output => finishNode(nodeIndex, output))
      .catch(terminatePipeline);
  });
}

export function continuePipelineEpic (action$, store) {
  return action$
    .ofType(ActionTypes.FINISH_NODE)
    .switchMap(({ payload: { nodeIndex, output } }) => {
      const pipeline = store.getState().tree.pipeline;
      const nextNodeIndex = nodeIndex + 1;
      return nextNodeIndex === pipeline.length
        ? Observable
          .of(finishPipeline(output))
        : Observable
          .concat([ startNode(nextNodeIndex), evaluateNode(nextNodeIndex, output) ])
          .catch(terminatePipeline);
    })
}
