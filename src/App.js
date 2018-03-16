import React from 'react';

import Nav from './components/Nav';
import InputData from './containers/InputData';
import TransformationPipeline from './containers/TransformationPipeline';

// TODO: learn more about redux-observable
// https://stackoverflow.com/questions/40021344/why-use-redux-observable-over-redux-saga
// https://hackmd.io/s/H1xLHUQ8e#side-by-side-comparison
// TODO: implement filter and reduce
// TODO: implement ajax requests (batching large amounts of data?)
// TODO: Figure out error handling
// TODO: Figure out cancellation
// TODO: Figure out how to reduce code size


// TODO: revisit the scripting api
// BUG: fix the script reseting when you go to edit
// TODO: UI/UX for the scripting api, documentation stuff w/ links, and a fullscreen toggle
// TODO: UI for node running and result analysis

// TODO: isolate the types of transformations, their interface for the user, and their interface for being executed
// TODO: make everything in the app related to the transformations generated from those interfaces as much as possible
// TODO: does this mean forms for editing nodes will need to templated, or broken out elsewhere?

// TODO: UX styling and look/feel
// TODO: UX and helpful messages?
// TODO: Disable and enable nodes
// TODO: Replay starting at a specific node
// TODO: debug feature that runs nodes one at a time then waits for approval to continue?
// TODO: progress bar or percentage updates

// TODO: local storage subscription and a function that dumps/loads state from json to make testing/debugging/sharing easier

// TODO: easter egg, clippy based tutorial on how to delete assets

const App = () => (
  <div>
    <Nav title='Unified FieldLink Loader' />
    <div className="container">
      <div>
        <InputData />
        <hr />
        <TransformationPipeline height={800} title="Transformations" />
      </div>
    </div>
  </div>
);

export default App;
