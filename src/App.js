import React from 'react';

import Nav from './containers/Nav';
import InputData from './containers/InputData';
import TransformationPipeline from './containers/TransformationPipeline';
import OutputData from './containers/OutputData';

// TODO: Button to see node results (input and output)
// TODO: Figure out error handling (when we terminate the pipeline we need to know what node erred)
// TODO: Disable and enable nodes (not by collapsing, collapsed ones still run, but some button to toggle them on and off)
// TODO: Play starting at a specific node (maybe im lazy and only need part of the pipeline)

// TODO: isolate the types of transformations, their interface for the user, and their interface for being executed
// TODO: make everything in the app related to the transformations generated from those interfaces as much as possible
// TODO: does this mean forms for editing nodes will need to templated, or broken out elsewhere?

// TODO: Figure out cancellation
// TODO: Figure out how to reduce code size
// TODO: Figure out batching for ajax requests

// TODO: UX and helpful messages and tooltips?
// TODO: Fullscreen editor mode
// TODO: debug feature that runs nodes one at a time then waits for approval to continue?
// TODO: local storage subscription and a function that dumps/loads state from json to make testing/debugging/sharing easier
// TODO: easter egg, clippy based tutorial on how to delete assets

const App = () => (
  <div>
    <Nav title="Graphical λ Builder (GLB)" />
    <div className="container">
      <div>
        <InputData />
        <hr />
        <OutputData />
        <hr />
        <TransformationPipeline height={800} title="Transformation λ's" />
      </div>
    </div>
  </div>
);

export default App;
