import React, { Component } from 'react';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
import ReactJson from 'react-json-view';

import CircleButton from './CircleButton';
import Editor from './Editor';

export default class InputData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      startDataFromFile: true,
      jsonText: JSON.stringify(props.data, null, 2),
      chosenFile: '',
      loadError: null,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      startDataFromFile: true,
      jsonText: JSON.stringify(this.props.data, null, 2),
      chosenFile: '',
      loadError: null,
    });
  };

  loadData = () => {
    const self = this;
    const dataIsFromFile = this.state.startDataFromFile;
    const tryToUpdateJson = (jsonText) => {
      try {
        this.props.updateFn({ updated_src: JSON.parse(jsonText) });
        self.toggle();
      } catch (e) {
        self.setState({ loadError: e });
      }
    };

    if (dataIsFromFile && this._files && this._files.length > 0) {
      let reader = new FileReader();
      reader.onload = (e) => {
        tryToUpdateJson(e.target.result);
      };
      reader.readAsText(this._files[0]);
    } else {
      tryToUpdateJson(this.state.jsonText);
    }
  };

  render() {
    return (
      <div>
        <div>
          <h3>
            Input Data{' '}
            <CircleButton type='plus' onClick={this.toggle} />{' '}
          </h3>
          <ReactJson
            name={false}
            collapsed={true}
            theme='apathy:inverted'
            onEdit={this.props.updateFn}
            onDelete={this.props.updateFn}
            onAdd={this.props.updateFn}
            src={this.props.data}
          />
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-lg'>
          <ModalHeader toggle={this.toggle}>Upload Input Data</ModalHeader>
          <ModalBody>
            <Form>
              <p>Provide optional input data that can be used in your transformation pipeline.</p>
              <FormGroup tag="fieldset">
                <legend>What are you trying to do?</legend>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      checked={this.state.startDataFromFile}
                      onChange={() => this.setState({ startDataFromFile: true })}
                    />{' '}
                    Upload JSON data from a file
                                    </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      checked={!this.state.startDataFromFile}
                      onChange={() => this.setState({ startDataFromFile: false })}
                    />{' '}
                    Paste/type JSON data into a text box
                                    </Label>
                </FormGroup>
              </FormGroup>
              {this.state.startDataFromFile &&
                <FormGroup>
                  <Label for="inputFile">File:</Label>
                  <Input type="file" name="file" id="inputFile" value={this.state.chosenFile}
                    innerRef={(input) => {
                      if (input) {
                        this._files = input.files;
                      }
                    }}
                    onChange={(e) => this.setState({ chosenFile: e.target.value })} />
                  <FormText color="muted">
                    Your file should contain valid JSON!
                                    </FormText>
                </FormGroup>}
              {!this.state.startDataFromFile &&
                <FormGroup>
                  <Editor
                    mode="json"
                    value={this.state.jsonText}
                    onChange={(newValue) => this.setState({ jsonText: newValue })}
                  />
                </FormGroup>}
              {this.state.loadError &&
                <Alert color="danger">{`${this.state.loadError}`}</Alert>}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.loadData}>Load</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
