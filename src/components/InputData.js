import React, { Component } from 'react';
import {
  Alert, Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, FormText, Label, Input
} from 'reactstrap';
import ReactJson from 'react-json-view';

import CircleButton from './CircleButton';
import Editor from './Editor';

export default class InputData extends Component {
  constructor(props) {
    super(props);

    this.state = { modal: false };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
    this.props.resetInputForm();
    this.props.editInputForm({
      jsonText: JSON.stringify(this.props.input, null, 2)
    });
  };

  loadData = () => {
    const { startDataFromFile, jsonText } = this.props.inputForm;

    const tryToUpdateJson = (jsonText) => {
      try {
        this.props.loadInputData(JSON.parse(jsonText));
        this.toggle();
      } catch (e) {
        this.props.editInputForm({ loadError: e });
      }
    };

    if (startDataFromFile && this._files && this._files.length > 0) {
      let reader = new FileReader();
      reader.onload = (e) => {
        tryToUpdateJson(e.target.result);
      };
      reader.readAsText(this._files[0]);
    } else {
      tryToUpdateJson(jsonText);
    }
  };

  render() {
    const { editInputForm, inputForm } = this.props;
    const { startDataFromFile, jsonText, chosenFile, loadError } = inputForm;
    return (
      <div>
        <div>
          <h3>
            Input Data
            {' '}
            <CircleButton type='plus' onClick={this.toggle} />
          </h3>
          <ReactJson
            name={false}
            collapsed={true}
            theme='apathy:inverted'
            onEdit={({ updated_src }) => this.props.loadInputData(updated_src)}
            onDelete={({ updated_src }) => this.props.loadInputData(updated_src)}
            onAdd={({ updated_src }) => this.props.loadInputData(updated_src)}
            src={this.props.input}
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
                      checked={startDataFromFile}
                      onChange={() => editInputForm({ startDataFromFile: true })}
                      />
                    Upload JSON data from a file
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio1"
                      checked={!startDataFromFile}
                      onChange={() => editInputForm({ startDataFromFile: false })}
                      />
                    Paste/type JSON data into a text box
                  </Label>
                </FormGroup>
              </FormGroup>
              {startDataFromFile &&
                <FormGroup>
                  <Label for="inputFile">File:</Label>
                  <Input type="file" name="file" id="inputFile" value={chosenFile}
                    innerRef={(input) => {
                      if (input) {
                        this._files = input.files;
                      }
                    }}
                    onChange={(e) => editInputForm({ chosenFile: e.target.value })}
                    />
                  <FormText color="muted">
                    Your file should contain valid JSON!
                  </FormText>
                </FormGroup>
              }
              {!startDataFromFile &&
                <FormGroup>
                  <Editor
                    mode="json"
                    value={jsonText}
                    onChange={(newValue) => editInputForm({ jsonText: newValue })}
                    />
                </FormGroup>
              }
              {loadError &&
                <Alert color="danger">{`${loadError}`}</Alert>
              }
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.loadData}>
              Load
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
