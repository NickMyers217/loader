import React, { Component } from 'react';

import { getVisibleNodeCount } from 'react-sortable-tree';

import Nav from './components/Nav';
import InputData from './containers/InputData';
import TransformationPipeline from './components/TransformationPipeline';


// TODO: refactoring and moving state into redux/redux-observable

// TODO: running the pipeline 
// TODO: how to handle ajax requests (batching large amounts of data?)

// TODO: UI for node running and result analysis

// TODO: revisit the scripting api
// TODO: isolate the types of transformations, their interface for the user, and their interface for being executed
// TODO: make everything in the app related to the transformations generated from those interfaces as much as possible
// TODO: does this mean forms for editing nodes will need to templated, or broken out elsewhere?

// TODO: autorunning? except for ajax stuff/maybe mocking?
// TODO: UX and helpful messages?
// TODO: debug feature?

// TODO: local storage subscription and a function that dumps/loads state from json

class App extends Component {
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
            <TransformationPipeline
              title="Transformations"
              treeData={this.state.treeData}
              height={getVisibleNodeCount(this.state) * 75}
              onChange={treeData => this.setState({ treeData })}
              onNewNode={node => this.setState(prevState => ({
                ...prevState,
                treeData: prevState.treeData.concat(node)
              }))}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
