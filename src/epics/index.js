import { combineEpics } from 'redux-observable';

// NOTE: here are helpful links for learning about redux-observable
// https://stackoverflow.com/questions/40021344/why-use-redux-observable-over-redux-saga
// https://hackmd.io/s/H1xLHUQ8e#side-by-side-comparison

import {
  runPipelineEpic,
  evaluateNodeEpic,
  continuePipelineEpic
} from './runTransformationPipeline';

export default combineEpics(
  runPipelineEpic,
  evaluateNodeEpic,
  continuePipelineEpic
);
