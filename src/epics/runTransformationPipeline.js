import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { getFlatDataFromTree } from 'react-sortable-tree';

import * as ActionTypes from '../ActionTypes';
import { startNode, evaluateNode, finishNode } from '../actions';

// TODO: Figure out error handling

export function runPipeline (action$, store) {
  return action$.ofType(ActionTypes.RUN_PIPELINE)
    .do(action => console.log('Running pipeline!'))
    .map(action => ({
      input: store.getState().input,
      pipeline: getFlatDataFromTree({
        treeData: store.getState().tree.data,
        getNodeKey: ({ node }) => node.id,
        ignoreCollapsed: false
      })
        .map(({ node }) => node)
    }))
    .flatMap(({ input, pipeline }) =>
      Observable.from([
        startNode(pipeline.slice(0, 1).shift()),
        evaluateNode(input, pipeline.slice(0, 1).shift(), pipeline.slice(1)),
        finishNode(pipeline.slice(0, 1).shift(), input, pipeline.slice(1))
      ])
    )
}

/*
export function evauluateNode (action$) {
  return action$.ofType(ActionTypes.EVALUATE_NODE)
    .flatMap(({ node, tail, input }) => {
      let observable = Observable.from(input);
      // TODO: this really belongs somewhere else probably
      switch (node.type) {
        case 'MAP':
          observable.map(input => input.map(node.mapFn));
          break;
        case 'FILTER':
          observable.map(input => input.filter(node.filterFn));
          break;
        case 'REDUCE':
          observable.map(input => input.reduce(node.reducerFn, node.initialValue));
          break;
        case 'AJAX':
          observable = ajax(node.getRequestOptions(input))
            .map(response => node.generateOutput(response, input));
          break;
      }
      return observable.map(output => finishNode(node, ouput, tail));
    })
}
*/

// TODO: maybe he can be merged with the runPipeline epic somehow??
export function continuePipeline (action$) {
  return action$.ofType(ActionTypes.FINISH_NODE)
    .flatMap(({ payload }) =>
      // TODO: add cancellation here for a stop button?
      payload.tail.length === 0
        ? Observable.do(_ => console.log('Finished!')) // TODO: actual action
        : Observable.from([
          startNode(payload.tail.slice(0, 1).shift()),
          evaluateNode(payload.output, payload.tail.slice(0, 1).shift(), payload.tail.slice(1)),
          finishNode(payload.tail.slice(0, 1).shift(), payload.output, payload.tail.slice(1))
        ])
    )
}
