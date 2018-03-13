import React, { Component } from 'react';

import uuid from 'uuid/v4';
import 'react-sortable-tree/style.css';
import SortableTree, { changeNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';
import { Alert, Badge, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrash from 'react-icons/lib/fa/trash';

import CircleButton from './CircleButton';

class TransformationPipeline extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modal: false,
            editingNode: {},
            form: {
                title: '',
                type: '',
                path: []
            }
        };
    }

    toggle = (node, path) => {
        this.setState({
            modal: !this.state.modal,
            editingNode: node || {},
            form: {
                title: node && node.title ? node.title : '',
                type: node && node.type ? node.type : '',
                path: path && Array.isArray(path) && path.length > 0 ? path : []
            }
        });
    };

    updateTree = () => {
        const { treeData } = this.props;
        const { editingNode, form } = this.state;
        this.props.onChange(changeNodeAtPath({
            treeData,
            path: form.path,
            newNode: {
                ...editingNode,
                ...form,
                title: (
                    <span><Badge color="primary">{form.type}</Badge> {form.title}</span>
                )
            },
            getNodeKey: ({ node }) => node.id,
            ignoreCollapsed: false
        }));
        this.toggle();
    };

    generateNode = () => ({
        id: uuid(),
        title: ':( Edit me',
        children: []
    });

    render () {
        return (
            <div>
                <div>
                    <div>
                        <h3>
                            {this.props.title || ''}{' '}
                            <CircleButton onClick={() => this.props.onNewNode(this.generateNode())} />
                        </h3>
                    </div>
                    <div style={{height: this.props.height || 300}}>
                        <SortableTree
                            treeData={this.props.treeData}
                            onChange={this.props.onChange}
                            getNodeKey={({ node }) => node.id}
                            generateNodeProps={({ node, path }) => ({
                                buttons: [
                                    <Button
                                        color='primary'
                                        style={{marginRight: 4}}
                                        onClick={() => this.toggle(node, path)}
                                    >
                                        <FaEdit/>
                                    </Button>,
                                    <Button
                                        color='danger'
                                        onClick={() => {
                                            this.props.onChange(removeNodeAtPath({
                                                treeData: this.props.treeData,
                                                path,
                                                getNodeKey: ({node}) => node.id
                                            }))
                                        }
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
                            {/* TODO: Title */}
                            <FormGroup>
                                <Label for="title">Name</Label>
                                <Input type="title" name="title" id="title" placeholder="Name (eg: Query job docs)"
                                       value={this.state.form.title}
                                       onChange={(e) => {
                                           const title = e.target.value;
                                           this.setState(state => ({
                                               ...state,
                                               form: { ...state.form, title }
                                           }));
                                       }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="type">Transformation Type</Label>
                                <Input type="select" name="type" id="type"
                                       value={this.state.form.type}
                                       onChange={(e) => {
                                           const type = e.target.value;
                                           this.setState(state => ({
                                               ...state,
                                               form: { ...state.form, type }
                                           }));
                                       }}
                                >
                                    <option></option>
                                    <option>AJAX Request</option>
                                    <option>Filter</option>
                                    <option>Map</option>
                                    <option>Reduce</option>
                                </Input>
                            </FormGroup>
                            {/* TODO: coding? */}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateTree}>Save</Button>{' '}
                        <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default TransformationPipeline;
