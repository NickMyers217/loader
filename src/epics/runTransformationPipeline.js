import { Observable } from 'rxjs';
import { getFlatDataFromTree } from 'react-sortable-tree';
import * as R from 'ramda';

import * as ActionTypes from '../ActionTypes';
import { startNode, evaluateNode, finishNode, finishPipeline, terminatePipeline } from '../actions';

export function runPipelineEpic (action$, store) {
  return action$
    .ofType(ActionTypes.RUN_PIPELINE)
    .switchMap(() => {
      const input = store.getState().input;
      const pipeline = store.getState().tree.pipeline;
      const node = R.head(pipeline);
      const tail = R.tail(pipeline);
      return pipeline.length > 0
        ? Observable
          .concat([ startNode(0), evaluateNode(0, input) ])
          .catch(terminatePipeline)
        : Observable.of(finishPipeline(input));
    });
}

export function evaluateNodeEpic (action$, store) {
  return action$
    .ofType(ActionTypes.EVALUATE_NODE)
    .switchMap(({ payload: { nodeIndex, input } }) => {
      const node = store.getState().tree.pipeline[nodeIndex];
      return Observable.from([
        finishNode(nodeIndex, input.map(eval(`(${node.script})`)))
      ])
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
        ? Observable.from([finishPipeline(output)])
        : Observable.concat([
          startNode(nextNodeIndex),
          evaluateNode(nextNodeIndex, output),
        ])
          .catch(terminatePipeline);
    })
}
