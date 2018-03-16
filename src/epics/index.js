import { combineEpics } from 'redux-observable';

import { runPipelineEpic, evaluateNodeEpic, continuePipelineEpic } from './runTransformationPipeline';

export default combineEpics(runPipelineEpic, evaluateNodeEpic, continuePipelineEpic);
