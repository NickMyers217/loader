import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';

import * as ActionTypes from '../ActionTypes';
import {
  startNode,
  evaluateNode,
  finishNode,
  finishPipeline,
  terminatePipeline
} from '../actions';

export function runPipelineEpic(action$, store) {
  return action$.ofType(ActionTypes.RUN_PIPELINE).switchMap(() => {
    const input = store.getState().input;
    const pipeline = store.getState().tree.pipeline;
    return pipeline.length > 0
      ? Observable.concat([startNode(0), evaluateNode(0, input)]).catch(err =>
          Observable.of(terminatePipeline, 0)
        )
      : Observable.of(finishPipeline(input));
  });
}

export function evaluateNodeEpic(action$, store) {
  return action$
    .ofType(ActionTypes.EVALUATE_NODE)
    .switchMap(({ payload: { nodeIndex, input } }) => {
      const node = store.getState().tree.pipeline[nodeIndex];
      const evalNode = (node, input) => {
        if (node.type === 'Map') {
          return Observable.of(input.map(eval(`(${node.script})`)));
        }
        if (node.type === 'Filter') {
          return Observable.of(input.filter(eval(`(${node.script})`)));
        }
        if (node.type === 'Reduce') {
          const { generateInitialValue, myReducerFn } = eval(
            `(${node.script})`
          );
          return Observable.of(
            input.reduce(myReducerFn, generateInitialValue(input))
          );
        }
        if (node.type === 'AJAX Request') {
          // TODO: batching goes here
          const { generateRequestOptions, generateOutput } = eval(
            `(${node.script})`
          );
          return ajax(generateRequestOptions(input)).map(e =>
            generateOutput(input, e.response)
          );
        }
      };
      try {
        return evalNode(node, input)
          .switchMap(output => Observable.of(finishNode(nodeIndex, output)))
          .catch(err => Observable.of(terminatePipeline(err, nodeIndex)));
      } catch (err) {
        return Observable.of(terminatePipeline(err, nodeIndex));
      }
    });
}

export function continuePipelineEpic(action$, store) {
  return action$
    .ofType(ActionTypes.FINISH_NODE)
    .switchMap(({ payload: { nodeIndex, output } }) => {
      const pipeline = store.getState().tree.pipeline;
      const nextNodeIndex = nodeIndex + 1;
      return nextNodeIndex === pipeline.length
        ? Observable.of(finishPipeline(output))
        : Observable.concat([
            startNode(nextNodeIndex),
            evaluateNode(nextNodeIndex, output)
          ]).catch(err => Observable.of(terminatePipeline(err, nodeIndex)));
    });
}
