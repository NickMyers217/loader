import React, { Component } from 'react';

import 'react-sortable-tree/style.css';
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrash from 'react-icons/lib/fa/trash';

import CircleButton from './CircleButton';

class TransformationPipeline extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modal: false,
            editingNode: {},
        };
    }

    toggle = (node) => {
        this.setState({
            modal: !this.state.modal,
            editingNode: node || {},
        });
    };

    render () {
        return (
            <div>
                <div>
                    <div>
                        <h3>
                            {this.props.title || ''}{' '}
                            <CircleButton onClick={() => this.props.onNewNode({title: 'Empty', children: []})} />
                        </h3>
                    </div>
                    <div style={{height: this.props.height || 300}}>
                        <SortableTree
                            treeData={this.props.treeData}
                            onChange={this.props.onChange}
                            generateNodeProps={({ node, path }) => ({
                                buttons: [
                                    <Button
                                        color='primary'
                                        style={{marginRight: 4}}
                                        onClick={() => this.toggle(node)}
                                    >
                                        <FaEdit/>
                                    </Button>,
                                    <Button
                                        color='danger'
                                        onClick={() =>
                                            this.props.onChange(removeNodeAtPath({
                                                treeData: this.props.treeData,
                                                path,
                                                getNodeKey: ({ treeIndex }) => treeIndex
                                            }))
                                        }
                                    >
                                        <FaTrash/>
                                    </Button>
                                ]
                            })}
                        />
                    </div>
                </div>

                <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className='modal-lg'>
                    <ModalHeader toggle={this.toggle}>Edit Node</ModalHeader>
                    <ModalBody>
                        <Form>
                            <p>This node will be part of a transformation pipeline that your data will travel through.</p>
                            <p>{JSON.stringify(this.state.editingNode)}</p>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.toggle()}>Save</Button>{' '}
                        <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default TransformationPipeline;
