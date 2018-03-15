import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { getFlatDataFromTree } from 'react-sortable-tree';

import * as ActionTypes from '../ActionTypes';
import {} from '../actions';

export default function getFile (action$) {
  return action$.ofType(ActionTypes.RUN_PIPELINE)
    .map(action => ({
      input: action.payload.input,
      pipeline: getFlatDataFromTree(action.payload.tree)
    }))
    .switchMap(({ input, pipeline }) => 
      pipeline.reduce((oberservable, node) => {
        // TODO: this switch probably belongs in some interface somewhere else, refactor
        switch (node.type) {
          case 'MAP':
            return observable.map(node.mapFn);
          case 'FILTER':
            return observable.filter(node.filterFn);
          case 'REDUCE':
            return observable.reduce(node.reducerFn, node.initialValue);
          case 'AJAX':
            // TODO: something for batching the request?
            return observable.flatMap(data => {
              return ajax(node.requestOptionsFn(data))
                .map(response => node.responseToOutputFn(response, data))
            });
        }
      }, Observable.of(input))
    );
    .catch(publishErr)
    .map(publishData)
}
