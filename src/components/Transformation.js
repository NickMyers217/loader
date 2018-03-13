import React, { Component } from 'react';

import 'react-sortable-tree/style.css';
import SortableTree from 'react-sortable-tree';

import CircleButton from './CircleButton';

class Transformation extends Component {
    render () {
        return (
            <div>
                <div>
                    <h3>
                        {this.props.title || ''} <CircleButton />
                    </h3>
                </div>
                <div  style={{height: this.props.height || 300}}>
                    <SortableTree
                        treeData={this.props.treeData}
                        onChange={this.props.onChange}
                    />
                </div>
            </div>
        );
    }
}

export default Transformation;
