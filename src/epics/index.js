import { combineEpics } from 'redux-observable';

import getFile from './getFile';

export default combineEpics(getFile);
