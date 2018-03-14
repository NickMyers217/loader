import React, { Component } from 'react';

import { getVisibleNodeCount } from 'react-sortable-tree';

import Nav from './components/Nav';
import InputData from './components/InputData';
import TransformationPipeline from './components/TransformationPipeline';


// TODO: refactoring and moving state into redux/redux-observable

// TODO: scripting api (revisit after r&d into running???)
// TODO: run (autorunning? except for ajax stuff/maybe mocking?)
// TODO: passing data from node to node
// TODO: accessing variables in a context???
// TODO: how to handle ajax requests (batching large amounts of data?)
// TODO: UX and helpful messages?

// TODO: debug feature?
// TODO: autorun feature? (except for ajax operations)

// TODO: cacheing, saving, and loading (redux local storage subscription???) and a function that dumps/loads state from json

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputData: {},
      treeData: [],
    };
  }

  render() {
    return (
      <div>
        <Nav title='Unified FieldLink Loader' />
        <div className="container">
          <div>
            <InputData
              data={this.state.inputData}
              updateFn={(e) => this.setState({ inputData: e.updated_src })}
            />
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
