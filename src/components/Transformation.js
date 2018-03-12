import React, { Component } from 'react';

import 'react-sortable-tree/style.css';
import SortableTree from 'react-sortable-tree';

import PlusSign from './PlusSign';

class Transformation extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <div>
                    <h3>
                        {this.props.title || ''} <PlusSign />
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
