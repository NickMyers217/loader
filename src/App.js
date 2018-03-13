import React, { Component } from 'react';

import Nav from './components/Nav';
import InputData from './components/InputData';
import TransformationPipeline from './components/TransformationPipeline';

// TODO: Add a new node
    // TODO: form
        // TODO: node types
            // TODO: transform (map, filter, and reduce)
            // TODO: ajax (extract and load)
        // TOOD: coding ui
// TODO: display the node
// TODO: edit node
    // TODO: ui???
// TODO: delete node

// TODO: run (autorunning? except for ajax stuff/maybe mocking?)
// TODO: debug
// TODO: autorun feature? (except for ajax operations)

// TODO: cacheing, saving, and loading (redux???)

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputData: {},
            transformationTree: [{ title: 'Node 1', children: [{ title: 'Node 2' }] }],
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
                            treeData={this.state.transformationTree}
                            onChange={transformationTree => this.setState({ transformationTree })}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
