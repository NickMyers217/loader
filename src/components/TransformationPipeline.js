import React, { Component } from 'react';

import uuid from 'uuid/v4';
import 'react-sortable-tree/style.css';
import SortableTree, { changeNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';
import { Alert, Badge, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrash from 'react-icons/lib/fa/trash';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';

import CircleButton from './CircleButton';

class TransformationPipeline extends Component {
    constructor (props) {
        super(props);

        this.state = {
            modal: false,
            editingNode: {},
            form: {
                path: [],
                displayTitle: '',
                title: undefined,
                type: '',
                script: '',
            }
        };
    }

    toggle = (node, path) => {
        this.setState({
            modal: !this.state.modal,
            editingNode: node || {},
            form: {
                path: path && Array.isArray(path) && path.length > 0 ? path : [],
                displayTitle: node && node.displayTitle ? node.displayTitle : '',
                title: node && node.title ? node.title : undefined,
                type: node && node.type ? node.type : '',
                script: node && node.script ? node.script : '',
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
                title: <span><Badge color="primary">{form.type}</Badge> {form.displayTitle}</span>
            },
            getNodeKey: ({ node }) => node.id,
            ignoreCollapsed: false
        }));
        this.toggle();
    };

    generateNode = () => ({
        id: uuid(),
        displayTitle: ':( Edit me',
        title: undefined,
        children: []
    });

    getDefaultScript = (type) => {
        switch (type) {
            case 'AJAX Request':
                return 'const ajaxOptions = {\n  url: "",\n  method: "GET",\n  findOptions: {}\n};';
            case 'Map':
                return '// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map\n\nfunction myMapFn (doc) {\n  return doc;\n}';
            case 'Filter':
                return '// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter\n\nfunction myFilterFn (doc) {\n  return true;\n}';
            case 'Reduce':
                return '// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce\n\nconst initialValue = []; // This is the starting point for the reduce\nfunction myReducerFn (accumulator, currentValue) {\n  return accumulator.concat(currentValue);\n}';
            default:
                return '';
        }
    };

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
                                        }}
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
                            <FormGroup>
                                <Label for="title">Name</Label>
                                <Input type="title" name="title" id="title" placeholder="Name (eg: Query job docs)"
                                       value={this.state.form.displayTitle}
                                       onChange={(e) => {
                                           const displayTitle = e.target.value;
                                           this.setState(state => ({
                                               ...state,
                                               form: { ...state.form, displayTitle }
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
                                               form: { ...state.form, type, script: this.getDefaultScript(type) }
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
                            <FormGroup>
                                <Label for="scriptEditor">Write a script for this node:</Label>
                                <AceEditor
                                    mode="javascript"
                                    theme="twilight"
                                    name="scriptEditor"
                                    id="scriptEditor"
                                    value={this.state.form.script}
                                    onChange={script => this.setState(state => ({
                                        ...state,
                                        form: { ...state.form, script }
                                    }))}
                                    showPrintMargin={true}
                                    showGutter={true}
                                    highlightActiveLine={true}
                                    fontSize={16}
                                    style={{ width: '100%', height: 225, fontFamily: 'monospace' }}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                    }}
                                />
                            </FormGroup>
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
