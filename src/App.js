import React, { Component } from 'react';

import Nav from './components/Nav';
import InputData from './containers/InputData';
import TransformationPipeline from './containers/TransformationPipeline';


// TODO: running the pipeline
// TODO: how to handle ajax requests (batching large amounts of data?)

// TODO: revisit the scripting api
// TODO: UI/UX for the scripting api, documentation stuff w/ links, and a fullscreen toggle
// TODO: UI for node running and result analysis

// TODO: isolate the types of transformations, their interface for the user, and their interface for being executed
// TODO: make everything in the app related to the transformations generated from those interfaces as much as possible
// TODO: does this mean forms for editing nodes will need to templated, or broken out elsewhere?

// TODO: UX and helpful messages?
// TODO: debug feature that runs nodes one at a time then waits?

// TODO: local storage subscription and a function that dumps/loads state from json

// TODO: UX styling and look/feel

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [],
    };
  }

  render() {
    return (
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
  }
}
