import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { getFlatDataFromTree } from 'react-sortable-tree';

import * as ActionTypes from '../ActionTypes';
import {} from '../actions';

// TODO: Figure out error handling

export function runPipeline (action$) {
  return action$.ofType(ActionTypes.RUN_PIPELINE)
    .map(action => ({
      input: action.payload.input,
      pipeline: getFlatDataFromTree(action.payload.tree)
    }))
    .flatMap(({ input, pipeline }) =>
      Observable.from([
        startNode(pipeline.slice(0, 1)),
        evaluateNode(pipeline.slice(0, 1), pipeline.slice(1), input)
      ])
    )
}

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

// TODO: maybe he can be merged with the runPipeline epic somehow
// TODO: base case for ending the pipeline
export function continuePipeline (action$) {
  return action$.ofType(ActionTypes.FINISH_NODE)
    .flatMap(({ node, input, tail }) =>
      // TODO: add cancellation here for a stop button?
      Observable.from([
        startNode(tail.slice(0, 1)),
        evaluateNode(tail.slice(0, 1), tail.slice(1), input)
      ])
    )
}

