import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import {
  Alert,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import FaExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrash from 'react-icons/lib/fa/trash';

import CircleButton from './CircleButton';
import Editor from './Editor';

export default class TransformationPipeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };
  }

  toggle = (node, path) => {
    this.setState({
      modal: !this.state.modal
    });
    this.props.resetNodeForm();
    this.props.editNodeForm(node && node.id ? { ...node, path } : {});
  };

  updateTree = () => {
    const { nodeForm } = this.props;
    this.props.swapNodeAtPath({
      ...nodeForm,
      title: (
        <span>
          <Badge color="primary">{nodeForm.type}</Badge> {nodeForm.displayTitle}
        </span>
      )
    });
    this.toggle();
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <nav
              className="navbar navbar-light bg-light"
              style={{ marginBottom: 10 }}
            >
              <h4>{this.props.title || ''} </h4>
              <CircleButton onClick={this.props.addNewNode} />
            </nav>
          </div>
          <div style={{ height: this.props.height || 300 }}>
            <SortableTree
              treeData={this.props.tree.data}
              onChange={this.props.swapTree}
              getNodeKey={({ node }) => node.id}
              generateNodeProps={({ node, path }) => ({
                buttons: [
                  <Button
                    color="primary"
                    style={{ marginRight: 4 }}
                    onClick={() => this.toggle(node, path)}
                  >
                    <FaEdit />
                  </Button>,
                  <Button
                    color="danger"
                    onClick={() => {
                      alert(`${JSON.stringify(node.err, null, 2)}`);
                    }}
                    style={{ marginRight: 4 }}
                    disabled={!node.errorDuringEvaluation}
                  >
                    <FaExclamationTriangle />
                  </Button>,
                  <Button
                    color="danger"
                    onClick={() => {
                      this.props.removeNodeAtPath(path);
                    }}
                  >
                    <FaTrash />
                  </Button>
                ]
              })}
            />
          </div>
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-lg"
        >
          <ModalHeader toggle={this.toggle}>Edit Node</ModalHeader>
          <ModalBody>
            <Form>
              <p>
                This node will be part of a transformation pipeline that your
                data will travel through.
              </p>
              <FormGroup>
                <Label for="title">Name</Label>
                <Input
                  type="title"
                  name="title"
                  id="title"
                  placeholder="Name (eg: Query job docs)"
                  value={this.props.nodeForm.displayTitle}
                  onChange={e => {
                    const displayTitle = e.target.value;
                    this.props.editNodeForm({ displayTitle });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="type">Transformation Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={this.props.nodeForm.type}
                  onChange={e => {
                    const type = e.target.value;
                    this.props.editNodeForm({ type });
                  }}
                >
                  <option />
                  <option>Map</option>
                  <option>Filter</option>
                  <option>Reduce</option>
                  <option>AJAX Request</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="scriptEditor">Write a script for this node:</Label>
                <div>{this.props.nodeForm.docs}</div>
                <br />
                <Editor
                  mode="javascript"
                  value={this.props.nodeForm.script}
                  height={350}
                  onChange={script => this.props.editNodeForm({ script })}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateTree}>
              Save
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
