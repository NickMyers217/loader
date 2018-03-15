import { Observable } from 'rxjs';

import * as ActionTypes from '../ActionTypes';
import { loadInputData, editInputForm } from '../actions';

export default function getFile (action$) {
  return action$.ofType(ActionTypes.REQUEST_FILE)
    .map(action => action.payload.file)
    .switchMap(file => new Observable(observer => {
      let reader = new FileReader();
      reader.onload = (e) => {
        try {
          observer.next(loadInputData(JSON.parse(e.target.result)));
          observer.complete();
        } catch (e) {
          observer.next(editInputForm({ loadError: e }));
          observer.complete();
        }
      };
      reader.readAsText(file);
    }));
}
