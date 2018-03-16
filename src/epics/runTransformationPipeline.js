import { Observable } from 'rxjs';
import { getFlatDataFromTree } from 'react-sortable-tree';

import * as ActionTypes from '../ActionTypes';
import { startNode, evaluateNode, finishNode, finishPipeline, terminatePipeline } from '../actions';

// TODO: Figure out error handling
// TODO: Figure out cancellation
// TODO: Figure out how to reduce code size

export function runPipelineEpic (action$, store) {
  return action$
    .ofType(ActionTypes.RUN_PIPELINE)
    .map(action => ({
      input: store.getState().input,
      pipeline: getFlatDataFromTree({
        treeData: store.getState().tree.data,
        getNodeKey: ({ node }) => node.id,
        ignoreCollapsed: false
      }).map(({ node }) => node)
    }))
    .switchMap(({ input, pipeline }) => {
      const node = pipeline.slice(0, 1).shift();
      const tail = pipeline.slice(1);

      return pipeline.length > 0
        ? Observable.concat([
          startNode(node),
          evaluateNode(input, node, tail)
        ]).catch(terminatePipeline)
        : Observable.from([ finishPipeline(input) ]);
    });
}

export function evaluateNodeEpic (action$) {
  return action$
    .ofType(ActionTypes.EVALUATE_NODE)
    .switchMap(({ payload }) => {
      const { node, input, tail } = payload;
      debugger;
      return Observable.from([
        finishNode(node, input.map(eval(`(${node.script})`)), tail)
      ]).catch(terminatePipeline);
    });
}

export function continuePipelineEpic (action$) {
  return action$
    .ofType(ActionTypes.FINISH_NODE)
    .switchMap(({ payload }) => {
      const { tail, output } = payload;
      const node = tail.slice(0, 1).shift();
      const newTail = payload.tail.slice(1);
      return payload.tail.length === 0
        ? Observable.from([finishPipeline(output)])
        : Observable.concat([
          startNode(node),
          evaluateNode(output, node, newTail),
          finishNode(node, output, newTail)
        ]).catch(terminatePipeline);
    })
}
