import React, { Component } from 'react';

import 'react-sortable-tree/style.css';
import SortableTree from 'react-sortable-tree';

import CircleButton from './CircleButton';

class TransformationPipeline extends Component {
    render () {
        return (
            <div>
                <div>
                    <h3>
                        {this.props.title || ''}{' '}
                        <CircleButton onClick={() => this.props.onNewNode({title: 'Node', children: []})} />
                    </h3>
                </div>
                <div style={{height: this.props.height || 300}}>
                    <SortableTree
                        treeData={this.props.treeData}
                        onChange={this.props.onChange}
                        generateNodeProps={({ node, path }) => ({
                            buttons: [
                                (<button>edit</button>)
                            ],
                            subtitle: (
                                <p>badge</p>
                            )
                        })}
                    />
                </div>
            </div>
        );
    }
}

export default TransformationPipeline;
