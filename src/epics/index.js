import { combineEpics } from 'redux-observable';

import { runPipeline, continuePipeline } from './runTransformationPipeline';

export default combineEpics(runPipeline, continuePipeline);
